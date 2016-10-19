import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Index from './containers/Index'
import SimplePage from './containers/SimplePage'

export default (
  <Route path="/" component={App}>
      <Route path="views/:type" component={SimplePage} />
  </Route>
)