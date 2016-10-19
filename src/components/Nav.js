import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import * as Analyse from '../utils/Analyse'
import { browserHistory} from 'react-router'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.showPage = this.showPage.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }
  
  showPage(pageName) {
    browserHistory.replace('/views/'+pageName)
    this.handleClose()
  }

  render() {
    return (
      <div>
        <AppBar title="C1 Dashboard" onTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={() => this.showPage('home')}>Home Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('story')}>Story Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('bug')}>Bug Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('session')}>Sessions</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('retro')}>Retros</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('tech')}>Tech Booklet</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('book')}>Books</MenuItem>
        </Drawer>
        <div className="logo">C1 Dashboard</div>
      </div>
    );
  }
}

export default Nav