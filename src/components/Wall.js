import React from 'react'
import classNames from 'classnames'
import {green50, green100,green800} from 'material-ui/styles/colors'


class Wall extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {stories, type} = this.props
		console.log('123', stories)
		return (
			<div className="wall">
				<h1 className="title">{type}</h1>
				{stories.map(story => (<div>{story.name}</div>))}	
			</div>
		)
	}
}

export default Wall