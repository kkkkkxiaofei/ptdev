import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import * as Analyse from '../utils/Analyse'
import { browserHistory} from 'react-router'
import CircleMenu from './CircleMenu'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      indexPath: true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.showPage = this.showPage.bind(this)
  }
  componentWillMount() {
    browserHistory.listen((location) => {
      const isIndexPath = location.pathname == "/"
      this.setState({indexPath: isIndexPath})
    })
  }
  handleToggle() {
    if(this.state.indexPath) {
      this.setState({open: !this.state.open})
    } else {
      browserHistory.push('/')
    }
  }

  handleClose() {
    this.setState({open: false})
  }
  
  showPage(pagePath) {
    browserHistory.push(pagePath)
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
          <MenuItem onTouchTap={() => this.showPage('/home')}>Home Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/story')}>Story Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/bug')}>Bug Page</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/views/session')}>Sessions</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/views/retro')}>Retros</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/views/tech')}>Tech Booklet</MenuItem>
          <MenuItem onTouchTap={() => this.showPage('/views/book')}>Books</MenuItem>
        </Drawer>
        <CircleMenu />
      </div>
    );
  }
}

export default Nav