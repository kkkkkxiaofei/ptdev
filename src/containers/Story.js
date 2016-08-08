import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStoryTransition } from '../actions/storyTransition'
import StoryCard from '../components/StoryCard'

class Story extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const story = this.props.story
		const transitions = this.props.transitions
		return (
			<div>
				<StoryCard story={story} transitions={transitions} fetchStoryTransition={this.props.actions.fetchStoryTransition} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		transitions: Object.values(state.storyTransitionReducer)
	}
} 

const mapDispatchToProps = (dispatch) => ({ 
  actions: bindActionCreators({
    fetchStoryTransition
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Story)