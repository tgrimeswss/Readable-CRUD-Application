import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux'
import {fetchCategories,fetchPostsByCategory} from '../actions'
import MenuItem from 'material-ui/MenuItem'
import {Link} from 'react-router-dom'

function handleClick() {
  alert('Make a comment on the following categories');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
  navBar: {
    textAlign:'center'
  }
};

class HeaderAddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  handleClose = () => this.setState({open: false});

  render() {
    const {categories,setCategory,fetchPostsByCategory,fetchCategories,setCurrentCategory} = this.props
    return (
      <div>
          <AppBar
            title={<span style={styles.title}>Add post in <span>{setCurrentCategory}</span></span>}
            onTitleClick={handleClick}
            iconElementLeft={
              <IconButton
                onClick={()=>{
                  fetchCategories()
                  this.handleToggle()
                }
                }>
                <NavigationMenu />
              </IconButton>}


              iconElementRight={
                <IconButton>
                  <Link to="/"><i className="material-icons">backspace</i></Link>
                </IconButton>}
             />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
          {categories.map((category)=>(

            <MenuItem
              style={styles.navBar}
              key={category.name}
              value={category.name}
              onClick={()=>{
                setCategory(category.name);
                fetchPostsByCategory(category.name)
                this.handleClose();
              }}
            >{category.name}</MenuItem>
          ))}
          </Drawer>
      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    categories: initialState.categories,
    currentCategory: initialState.currentCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    fetchPostsByCategory: (data) => dispatch(fetchPostsByCategory(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderAddPost);
