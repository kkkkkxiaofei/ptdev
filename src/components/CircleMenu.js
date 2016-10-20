import React from 'react'
// import '../styles/circle-menu.scss'
import { Link } from 'react-router'
export default class CircleMenu extends React.Component {
	
	render() {
		return (
				<div className="csstransforms">
					<div className="component">
						<button className="cn-button" id="cn-button">Menu</button>
						<div className="cn-wrapper opened-nav" id="cn-wrapper">
							<ul>
								<li><Link to="/home"><span>Home</span></Link></li>
								<li><Link to="/story"><span>Story</span></Link></li>
								<li><Link to="/bug"><span>Bug</span></Link></li>
								<li><Link to="/views/session"><span>Sessions</span></Link></li>
								<li><Link to="/views/retro"><span>Retros</span></Link></li>
								<li><Link to="/views/tech"><span>Techs</span></Link></li>
								<li><Link to="/views/book"><span>Books</span></Link></li>
							 </ul>
						</div>
					</div>
				</div>
		)
	}
}