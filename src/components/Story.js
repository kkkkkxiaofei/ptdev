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

	render() {
		const story = this.props.story
		return (
			<TableRow>
			  <TableRowColumn>1</TableRowColumn>
			  <TableRowColumn>John Smith</TableRowColumn>
			  <TableRowColumn>Employed</TableRowColumn>
			</TableRow>
		)
	}
}

export default Story