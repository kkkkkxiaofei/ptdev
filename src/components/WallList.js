import React from 'react'
import classNames from 'classnames'
import * as Analyse from '../utils/Analyse'
import {green50, green100,green800} from 'material-ui/styles/colors'
import { ptAsynCall, Schemas, getLimit } from '../middleware/api'
import Wall from './Wall'
import { securityHash } from '../middleware/api'

class WallList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stories: []
		}
		this.setStories = this.setStories.bind(this)
	}

	componentWillMount() {
		const scope = securityHash["scope"]
		const storyCall = () => {
			if(scope) {
				ptAsynCall(
				  '/stories/?with_label=' + scope + '&limit=200',
				  null, 
				  (response) => {
				    const stories = Object.values(response)
				    this.setStories(stories)
				  }
				)
			}
		}
		storyCall()
		setInterval(() => storyCall(), 30*1000)
	}

	setStories(stories) {
		this.setState({stories: stories})
	}

	render() {
		return (
			<div className="wallList">
				<div className="wallListContainer">
						{[["unscheduled", "planned"], "started", "finished", "delivered", "accepted"].map((state) => {
							return(<Wall stories={Analyse.filterStoriesByState(this.state.stories, state)} state={state} />)
						})}
				</div>	
			</div>
		)
	}
}

export default WallList