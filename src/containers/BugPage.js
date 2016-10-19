import React from 'react'
import Graph from '../components/Graph'
import StoryList from '../components/StoryList'
import Search from '../components/Search'
import * as Analyse from '../utils/Analyse'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class BugPage extends React.Component {
  constructor(props) {
    super(props)
    this.bugTendencyAnalyse = this.bugTendencyAnalyse.bind(this)
    this.bugSeverityAnalyse = this.bugSeverityAnalyse.bind(this)
    this.bugCategoryAnalyse = this.bugCategoryAnalyse.bind(this)
    this.subRender = this.subRender.bind(this)
    this.state = {stories: []}
    this.setStories = this.setStories.bind(this)
  }

  setStories(stories) {
    this.setState({stories: stories})
  }

	bugTendencyAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateTendencyByType(stories, 'bug')
    return {
      graphData: graphData,
      graphType: 'bugTendencyAnalyse'
    }
  }

  bugSeverityAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateSeverity(stories)
    return {
      graphData: graphData,
      graphType: 'bugSeverityAnalyse'
    }
  }

  bugCategoryAnalyse() {
    const stories = this.state.stories
    const graphData = Analyse.generateBugCategory(stories, 'bug')
    
    return {
      graphData: graphData,
      graphType: 'bugCategoryAnalyse'
    }
  }

  subRender() {
    const stories = this.state.stories
    if(stories.length > 0) {
      return (
        <div>
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
            <StoryList stories={stories} storyType="bug" />
          </div>
        </div>
      )
    }
  }

  render() {
  	const stories = this.state.stories
    return (
      <MuiThemeProvider>
        <div className="storyPage">
          <Search action={{setStories: this.setStories}} />
          {this.subRender()}	
        </div>
      </MuiThemeProvider>
    )
  }
}