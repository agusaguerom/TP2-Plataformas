import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
