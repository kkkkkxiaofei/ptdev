import React from 'react'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	if(this.props.storyPage) {
	    return (
	      <div className="storyPage">Welcome to story page</div>
	    )
  	}
  	return (<div></div>)
  }
}

  