import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class ErrorView extends Component {

  render() {

    return (
      <div>
        <h1>404 - Page not found :(</h1>
        <Link to="/">Back to home</Link>
      </div>
    )
  }
}

export default ErrorView;
