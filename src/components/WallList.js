import React from 'react'
import classNames from 'classnames'
import * as Analyse from '../utils/Analyse'
import {green50, green100,green800} from 'material-ui/styles/colors'
import { ptAsynCall, Schemas, getLimit } from '../middleware/api'
import Wall from './Wall'

class WallList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stories: []
		}
		this.setStories = this.setStories.bind(this)
	}

	componentWillMount() {
		setInterval(() => {
			ptAsynCall(
			  '/stories/?with_label=iteration70&limit=200',
			  null, 
			  (response) => {
			    const stories = Object.values(response)
			    this.setStories(stories)
			  }
			)
		}, 1000*60)
	}

	setStories(stories) {
		this.setState({stories: stories})
	}

	render() {
		return (
			<div className="wallList">
				<div className="wallListContainer">
						{["unscheduled", "started", "finished", "delivered", "accepted"].map((state) => {
							return(<Wall stories={Analyse.filterStoriesByState(this.state.stories, state)} state={state} />)
						})}
				</div>	
			</div>
		)
	}
}

export default WallList