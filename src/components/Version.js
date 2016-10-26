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
		const VERSION = `reference: misk5_15.25.47.14
										commit: 1d8451d07ecc792b69b4b5b8e2586f1e5108420d
										integrated_tag: int_prd_15.38.61.14
										deployed: Mon Oct 24 13:03:47 2016 -0500`
		this.setState({isEqual: res == VERSION})
	}

	render() {
		return (
			<div className={classNames("statusBlock", "bgBlue", {"bgRed": !this.state.isEqual})}>

			</div>
		)
	}
}