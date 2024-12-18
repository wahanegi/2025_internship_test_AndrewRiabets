import React from 'react';
import axios from 'axios';
import createCsrfToken from '../utils/csrf';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      createCsrfToken();
      await axios.delete('/users/sign_out');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      className="btn btn-outline-danger"
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
