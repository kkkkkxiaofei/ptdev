import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Index from './containers/Index'
import HomePage from './containers/HomePage'
import StoryPage from './containers/StoryPage'
import BugPage from './containers/BugPage'
import SimplePage from './containers/SimplePage'

export default (
  <Route path="/" component={App}>

    <Route path="/home" component={HomePage} />
    <Route path="/story" component={StoryPage} />
    <Route path="/bug" component={BugPage} />
    <Route path="/views/:type" component={SimplePage} />
  </Route>
)