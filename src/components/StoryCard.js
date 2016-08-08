import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import StoryTransition from './StoryTransition'

export default class StoryCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.analyse = this.analyse.bind(this)
    this.assembleTransitions = this.assembleTransitions.bind(this)
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

  countDay(diffTime) {
    if(typeof diffTime == "number") {
      return diffTime/1000/3600/24
    }
  }

  assembleTransitions() {
    const transitions = this.props.transitions
    if(transitions.length > 0) {
      const storyId = this.props.story.id
      if(storyId == transitions[0].story_id) {
        let transitionHash = {}
        transitions.forEach(transition => {
          transitionHash[transition.state] = new Date(transition.occurred_at)
        }) 
        const finishedDay = this.countDay(transitionHash['finished'] - transitionHash['started']) || 0, 
        deliveredDay = this.countDay(transitionHash['delivered'] - transitionHash['finished']) || 0, 
        acceptedDay = this.countDay(transitionHash['accepted'] - transitionHash['delivered']) || 0
        const transitionData = [
          {
            label: 'transitions',
            values: [
              {x: 'Finished', y: finishedDay},
              {x: 'Delivered', y: deliveredDay},
              {x: 'Accepted', y: acceptedDay}
            ]
          }
        ]
        return transitionData
      }
    }
    return ''
  }

  render() {
    const transitionData = this.assembleTransitions()
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