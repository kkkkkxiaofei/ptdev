import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

const API_ROOT = 'https://www.pivotaltracker.com/services/v5/projects/'
let secruityHash = null

function createHeaders(token) {
    const headerOptions = {
      'X-TrackerToken': token
    }
    return headerOptions
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, param) {
  if(!secruityHash) {
    secruityHash = param
  }
  const fullUrl = API_ROOT + secruityHash.projectId + endpoint
  return fetch(fullUrl, {
    headers: createHeaders(secruityHash.token) || {},
    method: 'GET',
    mode: 'cors'
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    if(!schema._key) {
      return Object.assign({}, json)
    }

    const camelizedJson = camelizeKeys(json.data)

    return Object.assign({},
      normalize(camelizedJson, schema)
    )
  })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const NO_FORMAT = 'NO_FORMAT'
const noFormatSchema = new Schema(NO_FORMAT)

// Schemas for Github API responses.
export const Schemas = {
  NO_FORMAT_ARRAY: arrayOf(noFormatSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }

  //comment this since we need support multi actions
  //if (!Array.isArray(types) || types.length !== 3) {
  //  throw new Error('Expected an array of three action types.')
  //}
  //if (!types.every(type => typeof type === 'string')) {
  //  throw new Error('Expected action types to be strings.')
  //}

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  const param = callAPI.param

  return callApi(endpoint, schema, param).then(
      (response) => {
        if (Array.isArray(successType)) {
          successType.forEach(function (type) {
            next(actionWith({
              response,
              type: type
            }))
          })
        }
        else {
          next(actionWith({
            response,
            type: successType
          }))
        }
        return response
      },
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
  )
}
