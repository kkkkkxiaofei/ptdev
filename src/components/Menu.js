import React from 'react'
import { Link } from 'react-router'


class Menu extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="menu bgLtBlue">
				<div className="type">
					<Link to="/story">
						<span><i className="material-icons">assignment</i></span>
						<span className="description">Story</span>
					</Link>
				</div>
				<div className="type">
					<Link to="/bug">
						<span><i className="material-icons">bug_report</i></span>
						<span className="description">Bug</span>
					</Link>
				</div>
				<div className="type">
					<Link to="/views/session">
						<span><i className="material-icons">supervisor_account</i></span>
						<span className="description">Session</span>
					</Link>
				</div>
				<div className="type">
					<Link to="/views/retro">
						<span><i className="material-icons">feedback</i></span>
						<span className="description">Retro</span>
					</Link>
				</div>
				<div className="type">
					<Link to="/views/tech">
						<span><i className="material-icons">info</i></span>
						<span className="description">Tech</span>
					</Link>
				</div>
				<div className="type">
					<Link to="/views/book">
						<span><i className="material-icons">book</i></span>
						<span className="description">Book</span>
					</Link>
				</div>
			</div>
		)
	}
}

export default Menu