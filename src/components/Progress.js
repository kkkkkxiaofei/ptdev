import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export default class StoryCard extends React.Component {
	
	render() {
		return this.props.show ? 
			(
				<div className="progress">
					<CircularProgress size={3} />
				</div>
			)
			: (<div></div>)
	}
}