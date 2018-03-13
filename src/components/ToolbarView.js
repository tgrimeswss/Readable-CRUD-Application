import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'

class ToolbarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    let {sortingCategory} = this.props
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Sort by..." />
              <MenuItem onClick={()=>{sortingCategory('title')}} value={2} primaryText="Title" />
              <MenuItem onClick={()=>{sortingCategory('voteScore')}} value={3} primaryText="Score" />
              <MenuItem onClick={()=>{sortingCategory('category')}} value={4} primaryText="Category" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <Link to="/addpost"><RaisedButton label="Add Post" primary={true} /></Link>
          </ToolbarGroup>
        </Toolbar>

      </div>

    )
  }
}



export default ToolbarView;
