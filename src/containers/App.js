import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Progress from '../components/Progress'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import Version from '../components/Version'
import WallList from '../components/WallList'
import Milestone from '../components/Milestone'
import Menu from '../components/Menu'
import classNames from 'classnames'

export default class App extends React.Component {
  
  render() {
    const isIndexPage = window.location.pathname == "/"
    const {children} = this.props
    return (
      <div>
    		<MuiThemeProvider>
    		  <div className="index">
    	  		<Nav />
    	  		<Modal />	
    	  		<Progress />
            <div className={classNames("dashboard", {"hidden": !isIndexPage})}>
              <Version />
              <WallList />
              <Milestone />
              <Menu />
            </div>
    		  </div>
    		</MuiThemeProvider>
        {children}
      </div>
    )
  }
}