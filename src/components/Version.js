import React from 'react'
import { asynVersionCall } from '../middleware/api'
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
		setInterval(() => {
			asynVersionCall(
				"https://www.livetext.com/assets/version.txt", 
				null, 
				res => this.compareVersion(res)
			)
		}, 30000)
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