import React from 'react'
import classNames from 'classnames'
import { BarChart } from 'react-d3-components'

class StoryTransition extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    const transitionData = this.props.transitionData

    if(transitionData) {
      var barCharData = [{
          values: [
            {x: 'Finished', y: transitionData.finishedDay},
            {x: 'Delivered', y: transitionData.deliveredDay},
            {x: 'Accepted', y: transitionData.acceptedDay}
          ]
      }];
  		return (
        <div className="storyTransition">
    			<BarChart
            data={barCharData}
            width={400}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
          />
        </div>
		  )
    }

    return (<div></div>) 
	}
}

export default StoryTransition