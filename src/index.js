import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import Root from './core/containers/Root'
import configureStore from './store/configureStore'
import './styles/main.scss'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Root store={store} history={history} />,
	document.getElementById('root')
)


