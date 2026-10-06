import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';
import { updateProfile } from '../services/userService';

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Persistencia de sesión al recargar la página (F5)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 4. Función Login adaptada para recibir el objeto 'credentials' y lanzar el error al componente
  const login = async (credentials) => {
    try {
      const data = await loginService(credentials.email, credentials.password);
      
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      sessionStorage.setItem('welcome_start_time', Date.now().toString());
      
      return data;
    } catch (error) {
      // Lanzamos el error para que el bloque try...catch de tu Login.jsx lo capture
      throw new Error(error.message || 'Credenciales inválidas');
    }
  };

  // 5. Función Register adaptada
  const register = async (userData) => {
    try {
      const data = await registerService(userData);
      
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      sessionStorage.setItem('welcome_start_time', Date.now().toString());
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error al registrar el usuario');
    }
  };

  // 6. Función Logout
  const logout = () => {
    logoutService();

    sessionStorage.removeItem('welcome_start_time');
    setToken(null);
    setUser(null);
  };

  // 7. Función para actualizar datos en vivo (como el Telegram ID)
  const updateUserData = async (newData) => {
    try {
      const currentToken = localStorage.getItem('token');
      const updatedUser = await updateProfile(user._id, newData, currentToken);

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true, mensaje: "¡Perfil actualizado con éxito! 🚀" };
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar el perfil');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 8. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};