import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Graph from './Graph'
import * as Analyse from '../utils/Analyse'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      graphData: null
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.bugTendencyAnalyse = this.bugTendencyAnalyse.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }

  bugTendencyAnalyse() {
    const stories = this.props.stories
    const graphData = Analyse.generateTendencyByType(stories, 'bug')
    this.setState({graphData: graphData, open: false})
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
        </Drawer>
        <Graph graphData={this.state.graphData}/>
      </div>
    );
  }
}

export default Nav