import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import StoryTransition from './StoryTransition'
import * as Analyse from '../utils/Analyse'

export default class StoryCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.analyse = this.analyse.bind(this)
  }

  handleExpandChange() {
    this.setState({expanded: !this.state.expanded})
  }

  handleExpand() {
    this.setState({expanded: true})
  }

  analyse() {
    const storyId = this.props.story.id
    this.props.fetchStoryTransition(storyId)
  }

  render() {
    const transitionData = Analyse.generateStroyCycleTime(this.props.transitions, this.props.story.id)
    const story = this.props.story
    const avatar = story.story_type == 'feature' ?
     "https://d3jgo56a5b0my0.cloudfront.net/next/assets/next/483b296b-feature.png"
     : "https://d3jgo56a5b0my0.cloudfront.net/next/assets/next/e95cc022-bug.png"
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={story.name}
          subtitle={story.story_type + '(' + story.estimate + ')'}
          actAsExpander={true}
          showExpandableButton={true}
          avatar={avatar}
        />
        <CardText expandable={true}>
          <StoryTransition transitionData={transitionData}/>
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Analyse" onTouchTap={this.analyse} />
        </CardActions>
      </Card>
    );
  }
}