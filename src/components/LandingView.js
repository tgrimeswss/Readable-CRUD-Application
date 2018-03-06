import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

class LandingView extends Component {

  render() {
    return (
      <div>
        <Card>
          <CardTitle title="Welcome to the Readable Forums!" />
          <CardText>
            Select a topic from the <span><i style={this.styles} className="material-icons">menu</i></span> to see whats being talked about!
          </CardText>
        </Card>
      </div>
    )
  }
}


export default LandingView;
