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

  componentDidMount() {
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
    const projectId = parameter.match(/p=([0-9]+)/)
    const token = parameter.match(/t=([0-9a-z]+)/)
    const limit = parameter.match(/l=([0-9]+)/)
    const hasProjectId = projectId && projectId.length > 1;
    const hasToken = token && token.length > 1;
    const hasInfo = hasProjectId && hasToken;
    if (hasInfo) {
      return {
        projectId: projectId[1],
        token: token[1],
        limit: limit ? limit[1] : 200
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