import React from 'react'
import Graph from '../components/Graph'
import StoryList from '../components/StoryList'
import * as Analyse from '../utils/Analyse'

export default class BugPage extends React.Component {
  constructor(props) {
    super(props)
    this.bugTendencyAnalyse = this.bugTendencyAnalyse.bind(this)
    this.bugSeverityAnalyse = this.bugSeverityAnalyse.bind(this)
    this.bugCategoryAnalyse = this.bugCategoryAnalyse.bind(this)
  }

	bugTendencyAnalyse() {
    const stories = this.props.stories
    const graphData = Analyse.generateTendencyByType(stories, 'bug')
    return {
      graphData: graphData,
      graphType: 'bugTendencyAnalyse'
    }
  }

  bugSeverityAnalyse() {
    const stories = this.props.stories
    const graphData = Analyse.generateSeverity(stories)
    return {
      graphData: graphData,
      graphType: 'bugSeverityAnalyse'
    }
  }

  bugCategoryAnalyse() {
    const stories = this.props.stories
    const graphData = Analyse.generateBugCategory(stories, 'bug')
    
    return {
      graphData: graphData,
      graphType: 'bugCategoryAnalyse'
    }
  }

  render() {
  	const {stories} = this.props
    return (
      <div className="storyPage">
      	<div className="graphList">
      		<div className="graphListContainer">
		  			{[this.bugTendencyAnalyse, this.bugSeverityAnalyse, this.bugCategoryAnalyse].map(method => {
		  				return (
		  					<Graph {...method()} />
		  				)
		  			})}
      		</div>
	  		</div>
	  		<div className="storyList" >
			  	{stories.length ? (<StoryList stories={stories} storyType="bug" />) : ''}
	  		</div>
      </div>
    )
  }
}