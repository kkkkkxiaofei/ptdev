import React from 'react'

export default class RetroPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {retroPage} = this.props
      if(retroPage) {
        return (
          <div className="retroPage">
            retro page
          </div>
        )
      }
      return (<div></div>)
  }

}

  