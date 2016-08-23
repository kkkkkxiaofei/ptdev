import React from 'react'
import classNames from 'classnames'
import {
  pink200,
  blue200,
  lime200,
  grey200,
  green200
} from 'material-ui/styles/colors'

class StoryTransition extends React.Component {
	constructor(props) {
		super(props)
    this.drawProgress = this.drawProgress.bind(this)
	}

  drawProgress(color, total, transitionData, progress) {
    const currentCost = transitionData[progress]
    if(currentCost) {
      const width = (currentCost/total*446) + "px"
      const storyStatus = this.props.story.current_state
      if(progress == "finishedDay" && storyStatus=="started") {
        color = "bgGrey"
      }
      return (<span className={classNames("transition", color)} style={{width: width}}>{currentCost}</span>)
    }
  }

	render() {
    const transitionData = this.props.transitionData
    const keys = Object.keys(transitionData)
    if(keys.length > 0) {
      const story = this.props.story
      const total = transitionData.finishedDay + transitionData.deliveredDay + transitionData.acceptedDay
  		return (
        <div className="storyTransition">
          {this.drawProgress("bgGreen", total, transitionData, "finishedDay")}
          {this.drawProgress("bgLime", total, transitionData, "deliveredDay")}
          {this.drawProgress("bgBlue", total, transitionData, "acceptedDay")}
        </div>
		  )
    } 

    return (<div></div>) 
	}
}

export default StoryTransition