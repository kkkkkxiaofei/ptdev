import React from 'react'
import classNames from 'classnames'
import {yellow100, green100} from 'material-ui/styles/colors'

const COLOR = {
	"unscheduled": "",
	"started": green100,
	"finished": "For QA",
	"delivered": "UAT",
	"accepted": "Done"
}

class Paper extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {story} = this.props
		return (
			<div className="paper">
				<div className="paperTitle">{story.estimate + " Points"}</div>
				<a className="paperContent">{story.name}</a>
				<div className="paperFooter">
					<span>123</span>
				</div>	
			</div>
		)
	}
}

export default Paper