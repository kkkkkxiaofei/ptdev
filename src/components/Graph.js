import React from 'react'
import classNames from 'classnames'
import { LineChart, PieChart } from 'react-d3-components'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'bugTendencyAnalyse': {
        func: this.drawLineChart.bind(this),
        name: 'Bug Tendency'
      },
      'bugSeverityAnalyse': {
        func: this.drawPieChart.bind(this),
        name: 'Bug Severity'
      }
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
            width={800}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            yAxis={{label: "Bug Count"}}
            xAxis={{label: "Iteration Number"}} />
        </div>
      ) 
    }
  }

  drawPieChart(graphData) {
    const keys = Object.keys(graphData)
    if(keys.length > 1) {
      let data = {
        values: keys.map(key => ({x: key, y: graphData[key]}))
      }
      return (
        <div>
          <PieChart
            data={data}
            width={600}
            height={400}
            margin={{top: 10, bottom: 10, left: 100, right: 100}}
          />
        </div>
      ) 
    }
  }

  render() {
    const graphType = this.props.graphType
    const graphData = this.props.graphData
    const handler = this.state[graphType]
    const result = handler && handler["func"](graphData)
    if(result) {
      return (
        <div className="graphBox">
          <h3>{handler["name"]}</h3>
          <div>{result}</div>
        </div>
      )
    }
    return <div></div>
  }
}

export default Graph