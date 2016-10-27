import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStoryTransition } from '../actions/storyTransition'
import StoryCard from './StoryCard'
import {TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as Analyse from '../utils/Analyse'
import { ptAsynCall } from '../middleware/api'
import StoryTransition from './StoryTransition'
import classNames from 'classnames'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {
  pinkA200
} from 'material-ui/styles/colors'
class Story extends React.Component {
	constructor(props) {
		super(props)
		this.analyse = this.analyse.bind(this)
		this.state = {
			transitionData: {}
		}
	}

	componentDidMount() {
		this.analyse(this.props.story.id)
	}

	analyse(storyId) {
	  ptAsynCall(
	    '/stories/' + storyId + '/transitions',
	    null, 
	    (response) => {
	      const transitions = Object.values(response)
	      const transitionData = Analyse.generateStroyCycleTime(transitions, storyId) || {}
	      this.setState({transitionData: transitionData})
	    }
	  )
	}

	render() {
		const story = this.props.story
		const transitionData = this.state.transitionData
		return (
			<TableRow>
			  	<TableRowColumn style={{width: "300px"}} >
					{transitionData["finishedDay"] > story.estimate ? 
						(<div className="notification">
						<NotificationsIcon color = {pinkA200}/>
						</div>) : ''
					}
					{story.name}
				</TableRowColumn>
				<TableRowColumn style={{width: "100px"}}>{Analyse.getOwners(story.owner_ids)}</TableRowColumn>
				<TableRowColumn style={{width: "100px"}}>{story.estimate}</TableRowColumn>
				<TableRowColumn style={{width: "100px"}}>{story.current_state}</TableRowColumn>
				<TableRowColumn>
				<StoryTransition transitionData={transitionData} story={story} />
				</TableRowColumn>
			</TableRow>
		)
	}
}

export default Story