// src/services/taskService.js
const API_URL = import.meta.env.VITE_API_URL; 

// Helper privado para inyectar el token JWT en las peticiones
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const getTasksService = async () => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Error al obtener las tareas');
  return await response.json();
};

export const createTaskService = async (taskData) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Error al crear la tarea');
  return await response.json();
};

export const updateTaskService = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) throw new Error('Error al actualizar la tarea');
  return await response.json();
};

export const deleteTaskService = async (id) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Error al eliminar la tarea');
  return await response.json();
};