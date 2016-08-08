import React from 'react'

export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.handler = this.handler.bind(this)
	}

	componentDidMount() {
		window.addEventListener('keypress', this.handler)
	}

	handler(e) {
		const keyCode = e.keyCode
		if(keyCode == '13') {
			this.props.search && this.props.search()
		}
	}

	render() {

		return (
			<div className="searchButton" onClick={this.props.search}>
  				<i className="material-icons">search</i>
  			</div>
		)  
	}
}
