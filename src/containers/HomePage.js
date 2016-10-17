import React from 'react'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {homePage} = this.props
      if(homePage) {
        return (
          <div className="homePage">
            home page
          </div>
        )
      }
      return (<div></div>)
  }

}

  