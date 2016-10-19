import React from 'react'
import 'isomorphic-fetch'

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
      <div className="simplePage">
        {
          mds.map(
            md => (
              <div>
                <a href={'/' + md.src}>{md.title}</a>
              </div>
            )
          )
        }
      </div>
    )
  }

}

  