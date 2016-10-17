import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import * as Analyse from '../utils/Analyse'

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
    this.props.switchPage(pageName);
    this.handleClose()
  }

  render() {
    return (
      <div>
        <AppBar title="Dashboard" onTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={() => this.showPage('homePage')}>Home Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('storyPage')}>Story Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('bugPage')}>Bug Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('sessionPage')}>Sessions</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('retroPage')}>Retros</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('techBookletPage')}>Tech Booklet</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('bookPage')}>Books</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Nav