import React from 'react'
import classNames from 'classnames'
import { BarChart } from 'react-d3'

class StoryTransition extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    const data = this.props.transitionData
		return data ? 
      (
        <div className="stroyTransition">
    			<BarChart
            data={data}
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