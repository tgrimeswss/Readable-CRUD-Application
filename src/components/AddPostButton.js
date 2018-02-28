import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card} from 'material-ui/Card'
import {Link} from 'react-router-dom'

class AddPostButton extends Component {

  styles={
    cursor:'pointer'
  }

  render() {
    if(this.props.value!=="") {
      return (
        <MuiThemeProvider>
          <Link to="addPost">
            <Card>
              <i
                style={this.styles}
                className="material-icons">add_circle_outline</i>
            </Card>
          </Link>
        </MuiThemeProvider>
      )
    } else return null
  }
}

export default AddPostButton;
