import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class AddPostButton extends Component {

  styles={
    cursor:'pointer',
    textAlign: 'center'
  }

  render() {
    const {currentCategory} = this.props
    const addPostRoute = `/category/${currentCategory}/addPost`
    if(this.props.value!=="") {
      return (
          <Link to={addPostRoute}>
            <i style={this.styles} className="material-icons">add_circle_outline</i>
          </Link>
      )
    } else return null
  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.currentCategory
  }
}

export default connect(mapStateToProps)(AddPostButton);
