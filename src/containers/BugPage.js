import React from 'react'

export default class BugPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	if(this.props.bugPage) {
	    return (
	      <div className="storyPage">Welcome to bug page</div>
	    )
  	}
  	return (<div></div>)
  }
}