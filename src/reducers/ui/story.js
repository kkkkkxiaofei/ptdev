import * as ActionTypes from '../../actions/story'

export default function(state = {isFetching: true}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_STORY_SUCCESS:
      return Object.assign({}, state, {isFetching: false})
    case ActionTypes.FETCH_STORY_FAILURE:
      return Object.assign({}, state, {isFetching: false})
    default:
      return state
  }
}
