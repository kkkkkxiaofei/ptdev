import { combineReducers } from 'redux'
import storyReducer from './storyReducer'
import storyTransitionReducer from './storyTransitionReducer'
import storyUIReducer from './ui/story'

export default combineReducers({
  storyReducer,
  storyUIReducer,
  storyTransitionReducer
})
