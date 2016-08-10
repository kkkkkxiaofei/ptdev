import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Story from './Story'
import classNames from 'classnames'
import * as Analyse from '../utils/Analyse'

class StoryList extends React.Component {
	constructor(props) {
		super(props)
		this.renderStoryList = this.renderStoryList.bind(this)
	}

	renderStoryList(type) {
		const stories = Analyse.filterStoriesByType(this.props.stories, type)
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
		return (
			<div>
				{this.renderStoryList('feature')}
				{this.renderStoryList('bug')}
			</div>
		)
	}
}

export default StoryList