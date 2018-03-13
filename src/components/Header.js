import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux'
import {fetchCategories,setCurrentCategory,setPost} from '../actions'
import MenuItem from 'material-ui/MenuItem'
import {Link} from 'react-router-dom'
import '../styles/index.css'

function handleClick() {
  alert('Make a comment on the following categories');
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  handleClose = () => this.setState({open: false});

  render() {
    const {categories,setCurrentCategory,fetchCategories} = this.props
    return (
      <div>
          <AppBar
            className="addCommentFont"
            title={<span><span>Readable</span></span>}
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
            />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
          <Link
            className="navBar"
            to="/">
            <MenuItem
              onClick={()=>{
                setPost({})
                this.handleClose()
                setCurrentCategory('Readable')
              }}>
              Home
            </MenuItem>
          </Link>

          {categories.map((category)=>(
            <Link key={category.name} className="navBar" to={`/${category.name}/posts`}>
              <MenuItem
                className="navBar"
                value={category.name}
                onClick={()=>{
                  setPost({})
                  setCurrentCategory(category.name)
                  this.handleClose();
                }}
                >
                {category.name}
              </MenuItem>
            </Link>
          ))}
          </Drawer>
      </div>
    )
  }
}

function mapStateToProps(initialState) {
  let catState = initialState.categoryReducer
  return {
    currentCategory: catState.currentCategory,
    categories: catState.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    setPost: (post) => dispatch(setPost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
