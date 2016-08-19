import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { setSecurityInfo } from '../middleware/api'


export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    const hasInfo = this.enterDirectly();
    this.state = {
      open: !hasInfo
    }
    this.handleClose = this.handleClose.bind(this)
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

  enterDirectly () {
    const limit = 200
    const parameter = window.location.search
    const projectId = parameter.match(/p=([0-9]+)/)
    const token = parameter.match(/t=([0-9a-z]+)/)
    const hasProjectId = projectId && projectId.length > 1;
    const hasToken = token && token.length > 1;
    const hasInfo = hasProjectId && hasToken;
    if (hasInfo) {
      setSecurityInfo({
        projectId: projectId[1],
        token: token[1],
        limit: limit
      })
    }
    return hasInfo;
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