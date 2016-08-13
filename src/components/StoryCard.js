import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300, indigo900} from 'material-ui/styles/colors';
import StoryTransition from './StoryTransition'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas } from '../middleware/api'


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

export default class StoryCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      transitionData: null
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
    asynCall(
      '/stories/' + storyId + '/transitions',
      Schemas.NO_FORMAT_ARRAY,
      null, 
      (response) => {
        const transitions = Object.values(response)
        const transitionData = Analyse.generateStroyCycleTime(transitions, storyId)
        this.setState({expanded: true, transitionData: transitionData})
      }
    )
  }

  render() {
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
          <div style={styles.wrapper}>
            {story.labels.map(label => {
              return (
                <Chip backgroundColor={blue300} style={styles.chip} >
                  <Avatar size={32}>{label.name.substr(0,1).toUpperCase()}</Avatar>
                  {label.name}
                </Chip>
              )
            })}
          </div>
          <StoryTransition transitionData={this.state.transitionData}/>
        </CardText>
        <CardActions>
          <FlatButton label="Analyse" onTouchTap={this.analyse} />
        </CardActions>
      </Card>
    );
  }
}