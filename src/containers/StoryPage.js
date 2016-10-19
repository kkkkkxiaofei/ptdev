import React from 'react'
import StoryList from '../components/StoryList'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	const {stories} = this.props
    return (
      <div className="storyPage">
	  		<div className="storyList" >
			  	{stories.length ? (<StoryList stories={stories} storyType="feature" />) : ''}
	  		</div>
      </div>
    )
  }
}

  