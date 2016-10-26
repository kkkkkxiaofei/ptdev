import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { setSecurityInfo } from '../middleware/api'


export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillMount() {
    const securityInfo = this.getSecurityInfo();
    if(securityInfo) {
      setSecurityInfo(securityInfo)
    } else {
      this.state = {
        open: true
      }
    }
  }

  handleClose() {
    const projectId = this.refs.projectId.input.value
    const token = this.refs.token.input.value
    const limit = parseInt(this.refs.limit.input.value)
    if(projectId && token && (limit > 0)) {
      setSecurityInfo({
        projectId: projectId,
        token: token,
        limit: limit
      })
      this.setState({open: false})
    }
  }

  getSecurityInfo () {
    const parameter = window.location.search
    const results = parameter.match(/([^&\?]+)/g) 
    if(results.length > 0) {
      return {
        projectId: results[0].replace('p=', ''),
        token: results[1].replace('t=', ''),
        limit: results[2].replace('l=', ''),
        username: results[3].replace('u=', ''),
        password: results[4].replace('w=', '')
      }
    }
    return null
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Setting your security info "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>
            <TextField ref="projectId" hintText="project id"/><br />
            <TextField ref="token" hintText="token" /><br />
            <TextField ref="limit" hintText="limit count" defaultValue="200" /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}