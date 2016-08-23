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

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			stories: this.props.stories || [],
			toggle: false,
			isStroyFetching: false
		}
		this.search = this.search.bind(this)
		this.bugTendencyAnalyse = this.bugTendencyAnalyse.bind(this)
    this.bugSeverityAnalyse = this.bugSeverityAnalyse.bind(this)
    this.bugCategoryAnalyse = this.bugCategoryAnalyse.bind(this)
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
			  		<Nav />
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
			  		<div className="graphList">
			  			{[this.bugTendencyAnalyse, this.bugSeverityAnalyse, this.bugCategoryAnalyse].map(method => {
			  				return (
			  					<Graph {...method()} />
			  				)
			  			})}
			  		</div>
			  		<div className="storyList" >
					  	{this.state.stories.length ? (<StoryList stories={this.state.stories} storyType="feature"/>) : ''}
			  		</div>
			  </div>
		  </MuiThemeProvider>
		)
	}
}

export default Index