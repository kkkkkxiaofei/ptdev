import React from 'react'

export default class TechBookletPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {TechBookletPage} = this.props
      if(TechBookletPage) {
        return (
          <div className="TechBookletPage">
            Tech Booklet
          </div>
        )
      }
      return (<div></div>)
  }

}

  