import React from 'react'
import StoryList from '../components/StoryList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Progress from '../components/Progress'
import Search from '../components/Search'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Graph from '../components/Graph'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas, getLimit } from '../middleware/api'
import HomePage from './HomePage'
import StoryPage from './StoryPage'
import BugPage from './BugPage'
import SimplePage from './SimplePage'
import { browserHistory } from 'react-router'
import Version from '../components/Version'

class Index extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		browserHistory.push('/home')
	}

	render() {
		const stories = this.state.stories
		return (
		  <div className="index">
	  		<Nav />
	  		<Modal />
	  	aaa
	  		<div className="dashboard">
	  			<Version />
	  		</div>
		  </div>
		)
	}
}

export default Index

