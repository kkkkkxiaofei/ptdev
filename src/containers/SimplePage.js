import React from 'react'
import 'isomorphic-fetch'
import { browserHistory, Link } from 'react-router'
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mds: []}
  }

  componentWillMount() {
    return fetch('/md.json').then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      console.log(response.ok,mdStructure);
      if (!response.ok) {
        return Promise.reject(json)
      }
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

  