import React from 'react'
import classNames from 'classnames'
import Slider from 'material-ui/Slider';

const BEGINING = new Date("Thu Oct 13 2016 00:00:00 GMT+0800 (CST)")
const ENDING = new Date("Thu Dec 15 2016 00:00:00 GMT+0800 (CST)")
const DAY = 1000*60*60*24
const TOTAL = (ENDING - BEGINING)/DAY

export default class Milestone extends React.Component {
	constructor(props) {
		super(props)
		this.state = {defaultValue: this.calcProgress()}
	}

	calcProgress() {
		return (new Date() - BEGINING)/DAY/TOTAL
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({defaultValue: defaultValue})
		}, DAY)
	}

	render() {
		return (
		  <div className="step">
		    <Slider defaultValue={this.state.defaultValue} />
		  	<div className="ending bgGreen">Final Release(Dec 15)</div>
		  </div>
		)
	}
}