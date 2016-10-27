import React from 'react'
import { Link } from 'react-router'

class Menu extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="menu bgLime">
				<div className="type">
					<span><i className="material-icons">assignment</i></span>
					<span className="description">Story</span>
				</div>
				<div className="type">
					<span><i className="material-icons">bug_report</i></span>
					<span className="description">Bug</span>
				</div>
				<div className="type">
					<span><i className="material-icons">supervisor_account</i></span>
					<span className="description">Session</span>
				</div>
				<div className="type">
					<span><i className="material-icons">feedback</i></span>
					<span className="description">Retro</span>
				</div>
				<div className="type">
					<span><i className="material-icons">info</i></span>
					<span className="description">Tech</span>
				</div>
				<div className="type">
					<span><i className="material-icons">book</i></span>
					<span className="description">Book</span>
				</div>
			</div>
		)
	}
}

export default Menu