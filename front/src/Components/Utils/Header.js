import React from 'react';
import Avatar from "../../assets/images/avatar.png";
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  return (
    <div className="header-in">
      <div className='container'>
        <div className='top'>
          <i className='bx bx-menu' id='btn1'></i>
          <span> Sales Dashboard</span>
          <div className='avatar_div'>
            <ul>
              <li>
                <img className='avatar' src={Avatar} alt=""/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
