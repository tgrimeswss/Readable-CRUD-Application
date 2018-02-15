import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostComment from './PostComment'

class Landing extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <PostComment addComment={this.props.addComment}/>
          </div>
        </MuiThemeProvider>
      </div>
    );

  }
}



export default Landing
