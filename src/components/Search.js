import React from 'react'
import Progress from './Progress'
import TextField from 'material-ui/TextField'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas, getLimit } from '../middleware/api'

export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.handler = this.handler.bind(this)
		this.state = {isStroyFetching: false}
	}

	componentDidMount() {
		window.addEventListener('keypress', this.handler)
	}

	search() {
		this.setState({isStroyFetching: true})
		const limit = getLimit()
		let labelName = this.refs.search.input.value
		const iterationNum = labelName.match(/^\d{2}/)
		if(iterationNum) {
			labelName = 'iteration' + iterationNum[0]
		}
		const setStories = this.props.action.setStories
		asynCall(
		  '/stories/?with_label=' + labelName + '&limit=' + limit,
		  Schemas.NO_FORMAT_ARRAY,
		  null, 
		  (response) => {
				this.setState({isStroyFetching: false})
		    const stories = Object.values(response)
		    setStories && setStories(stories)
		  }
		)
	}

	handler(e) {
		const keyCode = e.keyCode
		if(keyCode == '13') {
			this.search()
		}
	}

	render() {
		return (
	  		<div className="searchBox pullRight">
		  			<TextField
							ref="search"
				      floatingLabelText="Enter a label name"
				      floatingLabelFixed={false}
		  			></TextField>
						<div className="searchButton" onClick={this.search}>
		  				<i className="material-icons">search</i>
		  			</div>
            <Progress show={this.state.isStroyFetching} />
	  		</div>
  		)
	}
}
