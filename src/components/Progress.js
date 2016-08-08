import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export default class StoryCard extends React.Component {
	
	render() {
		console.log(this.props.show)
		return this.props.show ? 
			(
				<div className="progress">
					<CircularProgress size={2} />
				</div>
			)
			: (<div></div>)
	}
}