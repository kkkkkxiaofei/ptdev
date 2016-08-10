import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class Header extends React.Component {
	render() {
		return (
		  <AppBar
		    title="PT Helper"
		    onClick={this.props.toggle}
		  />
		)
	}
}

export default Header