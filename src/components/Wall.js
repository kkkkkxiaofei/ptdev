import React from 'react'
import classNames from 'classnames'
import Glossary from '../utils/Glossary'
import Paper from './Paper'
import * as Analyse from '../utils/Analyse'
import {grey100, yellow100, blueGrey100, orange100 ,green100} from 'material-ui/styles/colors'

const COLOR = {
	"unscheduled": grey100,
	"started": yellow100,
	"finished": blueGrey100,
	"delivered": orange100,
	"accepted": green100
}

class Wall extends React.Component {
	constructor(props) {
		super(props)
	}

	getParams(story) {
		return {
			bgColor: COLOR[story.current_state],
			title: story.estimate + " Points " + "#" + story.id,
			description: story.name,
			url: story.url,
			footer: Analyse.getOwners(story.owner_ids)
		}
		
	}

	render() {
		const {stories, state} = this.props
		const points = Analyse.getAllPoints(stories)
		return (
			<div className="wall">
				<h1 className="title">{Glossary[state]} 
					<span className="points">({points + "Points "})</span>
				</h1>
				{stories.map(story => (<Paper params={this.getParams(story)} />) )}	
			</div>
		)
	}
}

export default Wall