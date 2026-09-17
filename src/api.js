// --- SIMULACIÓN LOCAL DEL BACKEND PARA USUARIOS ---
export const loginRequest = async (credentials) => {
  const users = JSON.parse(localStorage.getItem('registered_users')) || [];
  const foundUser = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!foundUser) {
    throw new Error('Correo o contraseña incorrectos');
  }

  return { token: 'token-simulado-xyz123', user: foundUser };
};

export const registerRequest = async (userData) => {
  const users = JSON.parse(localStorage.getItem('registered_users')) || [];
  users.push(userData);
  localStorage.setItem('registered_users', JSON.stringify(users));
  
  return { message: 'Registro exitoso' };
};


// --- NUEVA CONEXIÓN AL BACKEND REAL PARA TAREAS ---
const API_URL = 'https://remindmebackend.onrender.com/';

export const getTasksRequest = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener las tareas');
  return await response.json();
};

export const createTaskRequest = async (taskData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Error al crear la tarea');
  return await response.json();
};

export const updateTaskRequest = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) throw new Error('Error al actualizar la tarea');
  return await response.json();
};

export const deleteTaskRequest = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar la tarea');
  return await response.json();
};