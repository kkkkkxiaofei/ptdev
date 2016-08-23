import React from 'react'
import StoryList from '../components/StoryList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Progress from '../components/Progress'
import Search from '../components/Search'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Graph from '../components/Graph'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas, getLimit } from '../middleware/api'
import StoryPage from './StoryPage'
import BugPage from './BugPage'

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			stories: this.props.stories || [],
			toggle: false,
			isStroyFetching: false,
		}
		this.search = this.search.bind(this)
		this.showStoryPage = this.showStoryPage.bind(this)
    this.showBugPage = this.showBugPage.bind(this)
    this.switchPage = this.switchPage.bind(this)
	}

	switchPage(page) {
		const toggleHash = {
			bugPage: false,
			storyPage: false
		}
		toggleHash[page] = true
		this.setState(toggleHash)
	}

	showStoryPage() {
		this.switchPage("storyPage")
	}

	showBugPage() {
		this.switchPage("bugPage")
	}

	bugTendencyAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateTendencyByType(stories, 'bug')
    return {
      graphData: graphData,
      graphType: 'bugTendencyAnalyse'
    }
  }

  bugSeverityAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateSeverity(stories)
    return {
      graphData: graphData,
      graphType: 'bugSeverityAnalyse'
    }
  }

  bugCategoryAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateBugCategory(stories, 'bug')
    
    return {
      graphData: graphData,
      graphType: 'bugCategoryAnalyse'
    }
  }

	search() {
		this.setState({isStroyFetching: true})
		const limit = getLimit()
		let labelName = this.refs.search.input.value
		const iterationNum = labelName.match(/^\d{2}/)
		if(iterationNum) {
			labelName = 'iteration' + iterationNum[0]
		}
		asynCall(
		  '/stories/?with_label=' + labelName + '&limit=' + limit,
		  Schemas.NO_FORMAT_ARRAY,
		  null, 
		  (response) => {
		    const stories = Object.values(response)
				this.setState({stories: stories, isStroyFetching: false})
		  }
		)
	}

	render() {
		const stories = this.state.stories
		return (
		  <MuiThemeProvider>
			  <div className="index">
			  		<Nav switchPage={this.switchPage} open={false} />
			  		<Modal />	
			  		<Progress show={this.state.isStroyFetching}/>
			  		<div className="searchBox pullRight">
			  			<TextField
		  					ref="search"
	  			      floatingLabelText="Enter a label name"
	  			      floatingLabelFixed={false}
			  			></TextField>
			  			<Search search={this.search} />
			  		</div>
			  		<StoryPage storyPage={this.state.storyPage} />
			  		<BugPage bugPage={this.state.bugPage} />
			  </div>
		  </MuiThemeProvider>
		)
	}
}

export default Index