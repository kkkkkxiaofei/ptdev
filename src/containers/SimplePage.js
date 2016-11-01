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

const externalResources = {
  tech: [
    {
      title: "Javascript中apply()的用法",
      url: "http://flypursue.com/jekyll/update/2015/05/12/js-call-apply.html"
    }
  ]

}

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mds: []}
  }

  componentWillMount() {
    asynCall('/md.json', null, (json) => {
      let mdStructure = Object.assign({}, json)
      let type = this.props.params.type
      this.setState({mds: mdStructure[type]})
    })
  }

  render() {
    let mds = this.state.mds || []
    let type = this.props.params.type
    mds = mds.concat(externalResources[type] || [])
    return (
      <MuiThemeProvider>
        <div className="simplePage">
          <div>
            {
              mds.map(
                md => (
                  <Paper style={style} zDepth={3}>
                    <div className="sticker">
                      <a target="blank" href={md.url || '/' + md.src}>{md.title.replace('.md', '')}</a>
                    </div>
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

  