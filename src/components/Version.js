import React from 'react'
import { asynFileCall } from '../middleware/api'
import classNames from 'classnames'

export default class Version extends React.Component {
	constructor(props) {
		super(props)
		this.compareVersion = this.compareVersion.bind(this)
		this.state = {
			isEqual: true
		}
	}

	componentDidMount() {
		asynFileCall(
			"https://www.livetext.com/assets/version.txt", 
			null, 
			res => this.compareVersion(res)
		)
	}

	compareVersion(res) {
		let VERSION = localStorage["VERSION"]
		if(VERSION) {
			let versionOject = JSON.parse(VERSION)
			this.setState({isEqual: versionOject.content == res})
		} else {
			localStorage["VERSION"] = JSON.stringify({
				date: new Date(),
				content: res
			})
		}
	}

	render() {
		return (
			<div className={classNames("statusBlock", "bgBlue", {"bgRed": !this.state.isEqual})}>

			</div>
		)
	}
}