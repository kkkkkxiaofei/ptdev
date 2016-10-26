import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Progress from '../components/Progress'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Version from '../components/Version'
import Milestone from '../components/Milestone'

export default class App extends React.Component {
  render() {
    const {children} = this.props
    return (
      <div>
		<MuiThemeProvider>
		  <div className="index">
	  		<Nav />
	  		<Modal />	
	  		<Progress />
        <div className="dashboard">
          <Version />
          <Milestone />
        </div>
		  </div>
		</MuiThemeProvider>
        {children}
      </div>
    )
  }
}