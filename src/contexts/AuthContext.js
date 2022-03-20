import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, changeUser] = useState(null);
  const [adminOn, setToggleAdmin] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setRefresh(true);
    axios
      .get(`http://localhost:5000/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          changeUser(res.data);
          setRefresh(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const logout = () => {
    window.location.href = '/auth/logout';
    changeUser(null);
    history && history.replace && history.replace('/login');
  };

  const toggleAdmin = () => {
    setToggleAdmin(!adminOn);
  };
  const value = {
    user,
    logout,
    refresh,
    adminOn,
    toggleAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
