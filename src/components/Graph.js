import React from 'react'
import classNames from 'classnames'
import { BarChart, LineChart, Brush } from 'react-d3'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'bugTendencyAnalyse': this.drawLineChart.bind(this)
    }
  }

  drawLineChart(graphData) {
    const iterationNums = Object.keys(graphData)
    if(iterationNums.length > 1) {
      let data = [
        {
          values: iterationNums.map(iterationNum => ({x: iterationNum, y: graphData[iterationNum]}))
        }
      ]
      return (
        <div>
          <LineChart
            data={data}
            width={400}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}} />
        </div>
      ) 
    }
  }

  render() {
    const graphType = this.props.graphType
    const graphData = this.props.graphData
    const handler = this.state[graphType]
    const result = handler && handler(graphData)
    if(result) {
      return result
    }
    return <div></div>
  }
}

export default Graph