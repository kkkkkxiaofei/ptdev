import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../../middleware/api'
import rootReducer from '../../reducers/rootReducer'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, api)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../reducers/rootReducer', () => {
      const nextRootReducer = require('../../reducers/rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
