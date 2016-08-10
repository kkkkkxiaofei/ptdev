import React from 'react'
import classNames from 'classnames'
import { BarChart } from 'react-d3'

class StoryTransition extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    const transitionData = this.props.transitionData
    const barCharData = [
      {
        label: 'transitions',
        values: [
          {x: 'Finished', y: transitionData.finishedDay},
          {x: 'Delivered', y: transitionData.deliveredDay},
          {x: 'Accepted', y: transitionData.acceptedDay}
        ]
      }
    ]
		return data ? 
      (
        <div className="stroyTransition">
    			<BarChart
            data={barCharData}
            width={400}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
          />
        </div>
		  )
      : 
      (<div></div>)
	}
}

export default StoryTransition