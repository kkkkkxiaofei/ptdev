import React from 'react'
import classNames from 'classnames'

class Paper extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {bgColor, title, description, url, footer} = this.props.params
		return (
			<div className="paper" style={{backgroundColor: bgColor}}>
				<div className="paperTitle">
					{title}
				</div>
				<a target="blank" title={description} href={url} className="paperContent">{description}</a>
				<div className="paperFooter">
					{footer}
				</div>	
			</div>
		)
	}
}

export default Paper