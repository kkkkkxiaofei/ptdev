import { combineReducers } from 'redux'
import storyReducer from './storyReducer'
import storyTransitionReducer from './storyTransitionReducer'
import storyUIReducer from './ui/story'
import { routerReducer as routing } from 'react-router-redux'

export default combineReducers({
	routing,
  storyReducer,
  storyUIReducer,
  storyTransitionReducer
})
