import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {
  blue500,
  lime200,
  grey400,grey300,grey200, grey100, grey50,
  cyanA200, greenA200, indigoA200, blueA200
} from 'material-ui/styles/colors'
import StoryTransition from './StoryTransition'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas } from '../middleware/api'


const styles = {
  chipBackGroundColors: [
    grey400,grey300,grey200,grey100, grey50
  ],
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
    this.getOwners = this.getOwners.bind(this)
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

  getOwners(ownerIds) {
    const owner = {
      '1899170': 'JS',
      '2023503': 'DX',
      '2023503': 'YC',
      '1462606': 'ZZ',
      '1657956': 'XF',
      '1462614': 'JY'
    }
    const owners = ownerIds.map(ownerId => owner[ownerId] || 'Unknow' )
    return owners.join('&')
  }

  render() {
    const story = this.props.story
    const avatar = story.story_type == 'feature' ?
      "https://d3jgo56a5b0my0.cloudfront.net/next/assets/next/483b296b-feature.png"
     : "https://d3jgo56a5b0my0.cloudfront.net/next/assets/next/e95cc022-bug.png"
    return (
      <div >
        <Card className="storyCard" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={story.name}
            subtitle={story.story_type + '(' + story.estimate + ')' + ' | ' + this.getOwners(story.owner_ids)}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={avatar}
          />
          <CardText expandable={true}>
            <div style={styles.wrapper}>
              {story.labels.map((label, index) => {
                return (
                  <Chip backgroundColor={styles.chipBackGroundColors[index % styles.chipBackGroundColors.length]} style={styles.chip} >
                    <Avatar size={32}>{label.name.substr(0,1).toUpperCase()}</Avatar>
                    {label.name}
                  </Chip>
                )
              })}
            </div>
            <StoryTransition transitionData={this.state.transitionData}/>
          </CardText>
          <CardActions className="cycleTime">
            <FlatButton icon={<FontIcon className="material-icons" color={story.story_type == 'feature' ? 'rgb(0, 188, 212)' : 'rgb(255, 64, 129)'}>equalizer</FontIcon>} onTouchTap={this.analyse} />
          </CardActions>
        </Card>
      </div>
    );
  }
}