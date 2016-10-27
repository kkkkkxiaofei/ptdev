import React from 'react'
import classNames from 'classnames'
import {green50, green100,green800} from 'material-ui/styles/colors'
import Glossary from '../utils/Glossary'
import Paper from './Paper'

class Wall extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {stories, state} = this.props
		return (
			<div className="wall">
				<h1 className="title">{Glossary[state]}</h1>
				{stories.map(story => (<Paper story={story} />) )}	
			</div>
		)
	}
}

export default Wall