import { createContext, useState } from 'react';
import { getToken, setToken, removeToken, getUser, setUserStorage, removeUserStorage } from '../utils/storageHelper';
import { loginRequest, registerRequest } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUser());

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    setToken(data.token);
    setUserStorage(data.user);
    setUser(data.user);
  };

  const register = async (userData) => {
    await registerRequest(userData);
  };

  const logout = () => {
    removeToken();
    removeUserStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};