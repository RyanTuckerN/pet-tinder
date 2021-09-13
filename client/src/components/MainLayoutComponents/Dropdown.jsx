import React from 'react';
import { Link } from 'react-router-dom'
// import { Route, Link, Switch } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Dropdown(props) {
  const { anchorEl, handleDropdownClose, clearToken } = props.dropdownProps

  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleAvatarClick}>
        Open Menu
      </Button> */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
      >
        <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
        <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
        <Link to='/'>
          <MenuItem onClick={clearToken}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}