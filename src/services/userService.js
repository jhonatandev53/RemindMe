const API_URL = import.meta.env.VITE_API_URL;

export const updateProfile = async (userId, userData, token) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // <--- Nuestro escudo JWT
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || 'Error al actualizar perfil');
  
  return data; 
};