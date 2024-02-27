
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SalesIcon from "../../assets/images/vector.png";
import StoreIcon from "../../assets/images/store.png";
import NotificationIcon from "../../assets/images/notification.png";
import SettingsIcon from "../../assets/images/settings.png";
import LightThemeIcon from "../../assets/images/lightTheme.png";

export const Sidebar = () => {
  return (
    <div className="sidebar active"> 
      <ul>
        <li>
          <Link to="/">
            <img src={SalesIcon} className='side-bar-icon'/>
            <span className='nav-item'>Sales Overview</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <img src={StoreIcon} className='side-bar-icon' />
            <span className='nav-item'>Stores</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={NotificationIcon} className='side-bar-icon' />
            <span className='nav-item'>Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={SettingsIcon} className='side-bar-icon' />
            <span className='nav-item'>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={LightThemeIcon} className='side-bar-icon' />
            <span className='nav-item'>Light Theme</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
