import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import '../styles/index.css'

class AddPostButton extends Component {

  render() {
      return (
          <Link to={"/addPost"}>
            <i className="material-icons addCommentFont centerText">add_circle_outline</i>
          </Link>
      )

  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.categoryReducer.currentCategory
  }
}

export default connect(mapStateToProps)(AddPostButton);
