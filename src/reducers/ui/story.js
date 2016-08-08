import * as ActionTypes from '../../actions/story'

export default function(state = {isFetching: false}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_STORY_REQUEST:
      return Object.assign({}, state, {isFetching: true})
    case ActionTypes.FETCH_STORY_SUCCESS:
      return Object.assign({}, state, {isFetching: false})
    case ActionTypes.FETCH_STORY_FAILURE:
      return Object.assign({}, state, {isFetching: false})
    default:
      return state
  }
}
