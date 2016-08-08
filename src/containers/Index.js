import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStory } from '../actions/story'
import StoryList from '../containers/StoryList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Progress from '../components/Progress'
import Search from '../components/Search'
import StoryTransition from '../components/StoryTransition'

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.search = this.search.bind(this)
		this.state = {stories: this.props.stories || []}
	}

	componentWillMount() {
		this.props.actions.fetchStory()
	}

	search() {
		const input = this.refs.search.input
		const filteredStories = this.props.stories.filter((story) => {
			const labels = story.labels
			return story.labels.some((label) => {
				return label.name == input.value
			})
		})
		this.setState({stories: filteredStories})
		input.value = ''
	}

	render() {
		const stories = this.state.stories
		return (
		  <MuiThemeProvider>
			  <div className="index">
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