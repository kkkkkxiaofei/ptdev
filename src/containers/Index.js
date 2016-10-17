import React from 'react'
import StoryList from '../components/StoryList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Progress from '../components/Progress'
import Search from '../components/Search'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Graph from '../components/Graph'
import * as Analyse from '../utils/Analyse'
import { asynCall, Schemas, getLimit } from '../middleware/api'
import HomePage from './HomePage'
import StoryPage from './StoryPage'
import BugPage from './BugPage'
import SimplePage from './SimplePage'
import RetroPage from './RetroPage'
import TechBookletPage from './TechBookletPage'
import BookPage from './BookPage'

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			stories: this.props.stories || [],
			toggle: false,
			isStroyFetching: false,
		}
		this.search = this.search.bind(this)
    this.switchPage = this.switchPage.bind(this)
	}

	componentWillMount() {
		this.switchPage('homePage')
	}

	switchPage(page) {
		const toggleHash = {
			homePage: false,
			bugPage: false,
			storyPage: false,
			sessionPage: false,
			retroPage: false,
			TechBookletPage: false,
			BookPage: false,
		}
		toggleHash[page] = true
		this.setState(toggleHash)
	}

	search() {
		this.setState({isStroyFetching: true})
		const limit = getLimit()
		let labelName = this.refs.search.input.value
		const iterationNum = labelName.match(/^\d{2}/)
		if(iterationNum) {
			labelName = 'iteration' + iterationNum[0]
		}
		asynCall(
		  '/stories/?with_label=' + labelName + '&limit=' + limit,
		  Schemas.NO_FORMAT_ARRAY,
		  null, 
		  (response) => {
		    const stories = Object.values(response)
				this.setState({stories: stories, isStroyFetching: false})
		  }
		)
	}

	render() {
		const stories = this.state.stories
		return (
		  <MuiThemeProvider>
			  <div className="index">
			  		<Nav switchPage={this.switchPage} open={false} />
			  		<Modal />	
			  		<Progress show={this.state.isStroyFetching}/>
			  		<div className="searchBox pullRight">
			  			<TextField
		  					ref="search"
	  			      floatingLabelText="Enter a label name"
	  			      floatingLabelFixed={false}
			  			></TextField>
			  			<Search search={this.search} />
			  		</div>
			  		<HomePage homePage={this.state.homePage} />
			  		<StoryPage storyPage={this.state.storyPage} stories={stories} />
			  		<BugPage bugPage={this.state.bugPage} stories={stories} />
			  		<SimplePage sessionPage={this.state.sessionPage} fileName="session.html" />
			  		<RetroPage retroPage={this.state.retroPage} />
					<TechBookletPage TechBookletPage={this.state.TechBookletPage} />
					<BookPage BookPage={this.state.BookPage} />
			  </div>
		  </MuiThemeProvider>
		)
	}
}

export default Index