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
		return (
			<div className="storyCol inlineBlock pullLeft">
				{stories.length ? (<div className={classNames("count", {bgRed: type == 'bug', bgBlue: type == 'feature'})}>{stories.length}</div>) : ''}
				{stories.length ? (<Chip backgroundColor={green100} style={styles.chip}>
                <Avatar size={32} backgroundColor={green50} color={green800}>{type.substr(0,1).toUpperCase()}</Avatar>
					{points} Points </Chip>) : ''}
				<div>
					{stories.map(story => (<Story key={story.id} story={story} />))}
				</div>
				<Table>
				  <TableHeader>
				    <TableRow>
				      <TableHeaderColumn>ID</TableHeaderColumn>
				      <TableHeaderColumn>Name</TableHeaderColumn>
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
				{this.renderStoryList('bug')}
			</div>
		)
	}
}

export default StoryList