import React from 'react'
import StoryList from '../components/StoryList'
import Search from '../components/Search'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {stories: []}
    this.setStories = this.setStories.bind(this)
  }

  setStories(stories) {
    this.setState({stories: stories})
  }

  render() {
    const stories = this.state.stories
    return (
      <MuiThemeProvider>
        <div className="storyPage clear">
            <Search action={{setStories: this.setStories}} />
    	  		<div className="storyList" >
    			  	{stories.length ? (<StoryList stories={stories} storyType="feature" />) : ''}
    	  		</div>
        </div>
      </MuiThemeProvider>
    )
  }
}

  