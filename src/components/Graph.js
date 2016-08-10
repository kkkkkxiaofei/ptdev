import React from 'react'
import classNames from 'classnames'
import { BarChart, LineChart, Brush } from 'react-d3'

class Graph extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.graphData) {
      return (
        <div>
          <LineChart
            data={this.props.graphData}
            width={400}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
        </div>
      ) 
    }
    return <div></div>
  }
}

export default Graph