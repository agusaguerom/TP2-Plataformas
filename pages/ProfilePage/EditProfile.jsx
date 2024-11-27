import React from 'react';
import Profile from '../../src/Components/Profile-todo/EditProfile'; 
import './EditProfile.css';


const EditProfilePage = () => {
  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <EditProfile />
      </div>
    </div>
  );
};

export default EditProfilePage;
