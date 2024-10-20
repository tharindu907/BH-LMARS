import React from 'react';
import './NavigationBar.css';
import { useUserContext } from '../../Context/UserContext';
import defaultProfilePic from '../Assets/avatar.svg';

const NavigationBar = () => {
  const { isLoggedIn, userType, username} = useUserContext();

  return (
    <div className="navigation-bar">
      <div className="left-corner">
        {userType === 'login' ? 'Log in' : userType}
      </div>
      {isLoggedIn && (
        <div className="right-corner">
          <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
          <span className="username">{username || 'User'}</span>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
