import {STORY_ENTITY_UPDATE} from '../actions/story'

export default function(state = {}, action) {
  if(action.type == STORY_ENTITY_UPDATE) {
    return Object.assign({}, state, action.response)
  }
  return state
}
