import React from 'react'
import classNames from 'classnames'
import {grey100, yellow100, blueGrey100, orange100 ,green100} from 'material-ui/styles/colors'
import * as Analyse from '../utils/Analyse'

const COLOR = {
	"unscheduled": grey100,
	"started": yellow100,
	"finished": blueGrey100,
	"delivered": orange100,
	"accepted": green100
}

class Paper extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {story} = this.props
		return (
			<div className="paper" style={{backgroundColor: COLOR[story.current_state]}}>
				<div className="paperTitle">{story.estimate + " Points "}
					<span>{"#" + story.id}</span>
				</div>
				<a target="blank" title={story.name} href={story.url} className="paperContent">{story.name}</a>
				<div className="paperFooter">
					{Analyse.getOwners(story.owner_ids)}
				</div>	
			</div>
		)
	}
}

export default Paper