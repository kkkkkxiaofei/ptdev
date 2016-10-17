import React from 'react'

export default class BookPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const {BookPage} = this.props
      if(BookPage) {
        return (
          <div className="BookPage">
            Book Recommendation
          </div>
        )
      }
      return (<div></div>)
  }

}

  