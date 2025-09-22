import React from 'react';
import Profile from '../../src/components/Profile-todo/Profile'; 
import './ProfilePage.css';  

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
