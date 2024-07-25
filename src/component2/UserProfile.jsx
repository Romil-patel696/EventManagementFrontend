import React from 'react';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <img src="profile-icon.png" alt="Profile" />
      <p>Name: Username</p>
      <p>Email: user@example.com</p>
      <button>Edit Profile</button>
    </div>
  );
};

export default UserProfile;
