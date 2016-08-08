import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStoryTransition } from '../actions/storyTransition'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Story from '../containers/Story'
import classNames from 'classnames'

class StoryList extends React.Component {
	constructor(props) {
		super(props)
		this.filterStoriesByType = this.filterStoriesByType.bind(this)
		this.renderStoryList = this.renderStoryList.bind(this)
	}

	filterStoriesByType(type) {
		return this.props.stories.filter(story => story.story_type == type)
	}

	renderStoryList(type) {
		const stories = this.filterStoriesByType(type)
		return (
			<div className="storyCol inlineBlock pullLeft">
				{stories.length ? (<div className={classNames("count", {bgRed: type == 'bug', bgBlue: type == 'feature'})}>{stories.length}</div>) : ''}
				<div>
					{stories.map(story => (<Story key={story.id} story={story} />))}
				</div>
			</div>
		)
	}

	render() {
		const stories = this.props.stories
		return (
			<div>
				{this.renderStoryList('feature')}
				{this.renderStoryList('bug')}
			</div>
		)
	}
}

export default StoryList