import React from 'react'
import '../styles/circle-menu.css'

export default class CircleMenu extends React.Component {
	
	render() {
		return (
				<div className="csstransforms">
					<div className="component">
						<button className="cn-button" id="cn-button">Menu</button>
						<div className="cn-wrapper opened-nav" id="cn-wrapper">
							<ul>
								<li><a href="#"><span>Home</span></a></li>
								<li><a href="#"><span>Story</span></a></li>
								<li><a href="#"><span>Bug</span></a></li>
								<li><a href="#"><span>Sessions</span></a></li>
								<li><a href="#"><span>Retros</span></a></li>
								<li><a href="#"><span>Tech Booklet</span></a></li>
								<li><a href="#"><span>Books</span></a></li>
							 </ul>
						</div>
					</div>
				</div>
		)
	}
}