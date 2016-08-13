import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStory } from '../actions/story'
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
			  		<Nav stories={this.state.stories} />
			  		<Modal />	
			  		<Progress show={this.state.isStroyFetching}/>
			  		<div className="searchBox pullRright">
			  			<TextField
			  					ref="search"
		  			      floatingLabelText="Enter a label name"
		  			      floatingLabelFixed={false}
			  			></TextField>
			  			<Search search={this.search} />
			  		</div>
			  		<div className="graphList">
			  			{[this.bugTendencyAnalyse, this.bugSeverityAnalyse].map(method => {
			  				return (
			  					<Graph {...method()} />
			  				)
			  			})}
			  		</div>
			  		<div className="storyList" >
					  	<StoryList stories={this.state.stories} />
			  		</div>
			  </div>
		  </MuiThemeProvider>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		stories: Object.values(state.storyReducer),
		isStroyFetching: state.storyUIReducer.isFetching
	}
} 

const mapDispatchToProps = (dispatch) => ({ 
  actions: bindActionCreators({
    fetchStory
  }, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)