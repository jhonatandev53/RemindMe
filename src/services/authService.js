// Leemos la URL de la API desde las variables de entorno de forma segura
const API_URL = import.meta.env.VITE_API_URL;

/* 1. INICIAR SESIÓN (LOGIN) */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al iniciar sesión');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/* 2. REGISTRAR USUARIO */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al registrar el usuario');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/* 3. CERRAR SESIÓN (LOGOUT) */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};