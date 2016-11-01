import React from 'react'
import 'isomorphic-fetch'
import { browserHistory, Link } from 'react-router'
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { asynCall } from '../middleware/api'
import {green100} from 'material-ui/styles/colors'

const style = {
  height: 150,
  width: 150,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: green100
};

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mds: []}
  }

  componentWillMount() {
    asynCall('/md.json', null, (json) => {
      var mdStructure = Object.assign({}, json)
      var type = this.props.params.type
      this.setState({mds: mdStructure[type]})
    })
  }

  render() {
    const mds = this.state.mds || []
    return (
      <MuiThemeProvider>
        <div className="simplePage">
          <div>
            {
              mds.map(
                md => (
                  <Paper style={style} zDepth={3}>
                    <a className="sticker" target="blank" href={'/' + md.src}>{md.title}</a>
                  </Paper>
                )
              )
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

  