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
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas } from '../middleware/api'

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.search = this.search.bind(this)
		this.state = {
			stories: this.props.stories || [],
			toggle: false
		}
	}

	search() {
		const input = this.refs.search.input
		asynCall(
		  '/stories/?limit=200&with_label=' + input.value,
		  Schemas.NO_FORMAT_ARRAY,
		  null, 
		  (response) => {
		    const stories = Object.values(response)
			this.setState({stories: stories})
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
			  		<Progress show={this.props.isStroyFetching}/>
			  		<div className="searchBox pullRright">
			  			<TextField
			  					ref="search"
		  			      floatingLabelText="iteration66,release_2b,etc."
		  			      floatingLabelFixed={false}
			  			></TextField>
			  			<Search search={this.search} />
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