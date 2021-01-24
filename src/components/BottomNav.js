import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore'
import React, { useEffect, useState } from "react";
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { setPage, } from "../redux/main";
import {connect} from 'react-redux';
function SimpleBottomNavigation(props) {
    
      return (
      <BottomNavigation
        value={props.page-3}
        onChange={(event, newValue) => {
          props.setPage(newValue+3);
        }}
        showLabels
      >
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />

      </BottomNavigation>
    );
  }

const mapStateToProps = (state) => ({
  page : state.page,
});

const mapDispatchToProps = {
  setPage
};

const BottomNavContainer = connect(mapStateToProps, mapDispatchToProps)(SimpleBottomNavigation);
export default BottomNavContainer;
