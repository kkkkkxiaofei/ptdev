import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Story from './Story'
import classNames from 'classnames'
import * as Analyse from '../utils/Analyse'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {green50, green100,green800} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'


const styles = {
  chip: {
    margin:8,
  },
}

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
		return (
			<div>
				{stories.length ? (<div className={classNames("count", {bgRed: type == 'bug', bgBlue: type == 'feature'})}>{stories.length}</div>) : ''}
				<Table>
				  <TableHeader {...tableHeaderSettings}>
				    <TableRow>
				      <TableHeaderColumn>Name</TableHeaderColumn>
				      <TableHeaderColumn>Pairs</TableHeaderColumn>
				      <TableHeaderColumn>Points</TableHeaderColumn>
				      <TableHeaderColumn>Status</TableHeaderColumn>
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
		return (
			<div>
				{this.renderStoryList('feature')}
			</div>
		)
	}
}

export default StoryList