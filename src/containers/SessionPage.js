import React from 'react'

export default class SessionPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {sessionPage} = this.props
      if(sessionPage) {
        return (
          <div className="sessionPage">
            <iframe src="../src/md/views/session.html" />
          </div>
        )
      }
      return (<div></div>)
  }

}

  