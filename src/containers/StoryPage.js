import React from 'react'
import StoryList from '../components/StoryList'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	const {storyPage, stories} = this.props
  	if(storyPage) {
	    return (
	      <div className="storyPage">
  	  		<div className="storyList" >
  			  	{stories.length ? (<StoryList stories={stories} storyType="feature" />) : ''}
  	  		</div>
	      </div>
	    )
  	}
  	return (<div></div>)
  }
}

  