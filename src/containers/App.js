import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Progress from '../components/Progress'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Version from '../components/Version'

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
        </div>
		  </div>
		</MuiThemeProvider>
        {children}
      </div>
    )
  }
}