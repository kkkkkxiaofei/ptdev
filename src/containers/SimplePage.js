import React from 'react'

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {visible, type} = this.props
      if(visible) {
        var src = "../src/md/views/" + type
        return (
          <div className="simplePage">
            <iframe id="framePage" src={src}></iframe>
          </div>
        )
      }
      return (<div></div>)
  }

}

  