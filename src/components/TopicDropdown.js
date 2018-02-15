import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class ThreadContainer extends Component {


  state = {
    value: 'Select a value'
  }

  styles = {
    customWidth: {
      width: 200,
    },
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <DropDownMenu style={this.styles.customWidth} value={this.props.value} onChange={this.props.handleChange}>
              <MenuItem value={null} primaryText='Select a topic below' />
                {this.props.categories.map((category)=>(
                  <MenuItem key={category.name} value={category.name} primaryText={category.name} />
                ))}
            </DropDownMenu>
            <i className="material-icons">add</i>
          </div>
        </MuiThemeProvider>
      </div>
    );

  }
}

export default ThreadContainer;
