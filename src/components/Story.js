import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStoryTransition } from '../actions/storyTransition'
import StoryCard from './StoryCard'
import {TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class Story extends React.Component {
	constructor(props) {
		super(props)
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
		const settings = {
			allRowsSelected: false
		}
		return (
			<TableRow {...settings}>
			  <TableRowColumn>{story.name}</TableRowColumn>
			  <TableRowColumn>{this.getOwners(story.owner_ids)}</TableRowColumn>
			  <TableRowColumn>{story.estimate}</TableRowColumn>
			  <TableRowColumn>{story.current_state}</TableRowColumn>
			</TableRow>
		)
	}
}

export default Story