import React from 'react';
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
        <MenuItem onClick={clearToken}>Logout</MenuItem>
      </Menu>
    </div>
  );
}