import React from 'react'

export default class SimplePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {visible, fileName} = this.props
      if(visible) {
        var src = "../src/md/views/" + fileName
        return (
          <div className="simplePage">
            <iframe id="framePage" src={src}></iframe>
          </div>
        )
      }
      return (<div></div>)
  }

}

  