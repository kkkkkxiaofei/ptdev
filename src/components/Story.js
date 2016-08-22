import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStoryTransition } from '../actions/storyTransition'
import StoryCard from './StoryCard'
import {TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas } from '../middleware/api'
import StoryTransition from './StoryTransition'

class Story extends React.Component {
	constructor(props) {
		super(props)
		this.analyse = this.analyse.bind(this)
		this.state = {
			transitionData: null
		}
	}

	componentDidMount() {
		this.analyse(this.props.story.id)
	}

	analyse(storyId) {
	  asynCall(
	    '/stories/' + storyId + '/transitions',
	    Schemas.NO_FORMAT_ARRAY,
	    null, 
	    (response) => {
	      const transitions = Object.values(response)
	      const transitionData = Analyse.generateStroyCycleTime(transitions, storyId)
	      this.setState({transitionData: transitionData})
	    }
	  )
	}

	getOwners(ownerIds) {
	  const owner = {
	    '1899170': 'JS',
	    '2023503': 'DX',
	    '1462606': 'ZZ',
	    '1657956': 'XF',
	    '1462614': 'JY',
	    '1819914': 'YC'
	  }
	  const owners = ownerIds.map(ownerId => owner[ownerId] || 'Unknow' )
	  return owners.join('&')
	}

	render() {
		const story = this.props.story
		
		return (
			<TableRow>
			  <TableRowColumn style={{width: "300px"}}>{story.name}</TableRowColumn>
			  <TableRowColumn style={{width: "100px"}}>{this.getOwners(story.owner_ids)}</TableRowColumn>
			  <TableRowColumn style={{width: "100px"}}>{story.estimate}</TableRowColumn>
			  <TableRowColumn style={{width: "100px"}}>{story.current_state}</TableRowColumn>
			  <TableRowColumn>
			  	<StoryTransition transitionData={this.state.transitionData} />
			  </TableRowColumn>
			</TableRow>
		)
	}
}

export default Story