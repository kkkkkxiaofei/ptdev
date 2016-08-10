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
		return (
			<div>
				<StoryCard story={story} />
			</div>
		)
	}
}

export default Story