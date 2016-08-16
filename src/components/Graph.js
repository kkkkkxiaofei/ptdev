import React from 'react'
import classNames from 'classnames'
import { LineChart, PieChart } from 'react-d3-components'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'bugTendencyAnalyse': {
        func: this.drawLineChart.bind(this),
        name: 'Bug Tendency',
        hoverEvent: (x, y) => y
      },
      'bugSeverityAnalyse': {
        func: this.drawPieChart.bind(this),
        name: 'Bug Severity',
        hoverEvent: (x, y) => y
      }
    }
  }

  drawLineChart(graphData, hoverEvent) {
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
            xAxis={{label: "Iteration Number"}}
            tooltipHtml={hoverEvent}
          />
        </div>
      ) 
    }
  }

  drawPieChart(graphData, hoverEvent) {
    const keys = Object.keys(graphData)
    if(keys.length > 1) {
      let data = {
        values: keys.map(key => ({x: key + '(' + graphData[key] + ')', y: graphData[key]}))
      }
      return (
        <div>
          <PieChart
            data={data}
            width={800}
            height={400}
            margin={{top: 10, bottom: 10, left: 100, right: 100}}
            tooltipHtml={hoverEvent}
          />
        </div>
      ) 
    }
  }

  render() {
    const {graphType, graphData} = this.props
    const handler = this.state[graphType]
    const result = handler && handler["func"](graphData, handler["hoverEvent"])
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