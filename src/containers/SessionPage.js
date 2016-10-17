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
            session list
          </div>
        )
      }
      return (<div></div>)
  }

}

  