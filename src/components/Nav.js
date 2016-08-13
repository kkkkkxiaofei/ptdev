import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import * as Analyse from '../utils/Analyse'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      graphData: {},
      graphType: ''
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }
  
  render() {
    return (
      <div>
        <AppBar title="PT Helper" onTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.bugTendencyAnalyse}>Bug Tendency</MenuItem>
          <MenuItem onTouchTap={this.bugSeverityAnalyse}>Bug Severity</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Nav