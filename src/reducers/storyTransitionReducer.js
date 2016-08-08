import {STORY_TRANSITION_ENTITY_UPDATE} from '../actions/storyTransition'

export default function(state = {}, action) {
  if(action.type == STORY_TRANSITION_ENTITY_UPDATE) {
    return Object.assign({}, state, action.response)
  }
  return state
}
