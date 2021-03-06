import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Story from './Story'
import classNames from 'classnames'
import * as Analyse from '../utils/Analyse'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {green50, green100,green800} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'


class StoryList extends React.Component {
	constructor(props) {
		super(props)
		this.renderStoryList = this.renderStoryList.bind(this)
	}

	renderStoryList(type) {
		const stories = Analyse.filterStoriesByType(this.props.stories, type)
		const points = Analyse.getAllPoints(this.props.stories, type)
		const tableHeaderSettings = {
			adjustForCheckbox: false,
			displaySelectAll: false
		}
		const tableSettings = {
			fixedHeader: true
		}
		return (
			<div>
				<div className={classNames("count", {bgRed: type == 'bug', bgBlue: type == 'feature'})}>{stories.length}</div>
				<Table {...tableSettings}>
				  <TableHeader {...tableHeaderSettings}>
				    <TableRow>
				      <TableHeaderColumn style={{width: "300px"}}>Name</TableHeaderColumn>
				      <TableHeaderColumn style={{width: "100px"}}>Pairs</TableHeaderColumn>
				      <TableHeaderColumn style={{width: "100px"}}>Points</TableHeaderColumn>
				      <TableHeaderColumn style={{width: "100px"}}>Status</TableHeaderColumn>
				      <TableHeaderColumn>Cycle Time</TableHeaderColumn>
				    </TableRow>
				  </TableHeader>
				  <TableBody>
				  	{stories.map(story => (<Story key={story.id} story={story} />))}
				  </TableBody>
				</Table>
			</div>
		)
	}

	render() {
		const storyType = this.props.storyType
		return (
			<div>
				{this.renderStoryList(storyType)}
			</div>
		)
	}
}

export default StoryList