import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import Index from './Index'

export default class Root extends Component {
  render() {
    const { store} = this.props
    return (
      <Provider store={store}>
        <div>
          <Index />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
