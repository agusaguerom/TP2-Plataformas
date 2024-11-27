import React from 'react';
import Profile from '../../src/Components/Profile-todo/Profile'; 
import './profilePage.css'; 

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

