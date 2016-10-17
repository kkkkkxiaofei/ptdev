import React from 'react'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {visible} = this.props
      if(visible) {
        return (
          <div className="homePage">
            home page
          </div>
        )
      }
      return (<div></div>)
  }

}

  