import React from 'react'
import { asynCICall } from '../middleware/api'
import classNames from 'classnames'

export default class CI extends React.Component {
	constructor(props) {
		super(props)
		this.handleCIInfo = this.handleCIInfo.bind(this)
	}

	componentDidMount() {
		setInterval(() => {
			asynCICall(
				"http://go-c1:test123@go.intra.livetext.com:8153/go/api/pipelines/C1/stages.xml", 
				res => this.handleCIInfo(res)
			)
		}, 1000)
	}

	handleCIInfo(res) {
		console.log(res)		
	}

	render() {
		return (
			<div className={classNames("ci statusBlock", "bgRed")}>
			</div>
		)
	}
}