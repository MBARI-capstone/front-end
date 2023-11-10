
import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // You can use useEffect here to load the user role when the component mounts
  // For example, by checking local storage or making an API call

  const value = { userRole, setUserRole };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Provider Component that will wrap the application and provide state