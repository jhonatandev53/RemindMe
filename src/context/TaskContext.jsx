import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // <--- Importamos el AuthContext
import { 
  getTasksService, 
  createTaskService, 
  updateTaskService, 
  deleteTaskService 
} from '../services/taskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Obtenemos el token o el usuario del AuthContext
  const { token } = useContext(AuthContext);

  const fetchTasks = async () => {
    // Si no hay token, ni nos molestamos en llamar a la API
    if (!token) {
      setTasks([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getTasksService();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  // Cada vez que el token cambie (ej: cuando el usuario hace login), ¡cargamos las tareas de ese usuario!
  useEffect(() => {
    fetchTasks();
  }, [token]);

  // Resto de tus funciones (addTask, updateTask, deleteTask) se quedan igual...
  const addTask = async (newTaskData) => {
    try {
      const createdTask = await createTaskService(newTaskData);
      setTasks((prev) => [...prev, createdTask]);
    } catch (err) {
      console.error('Error creando tarea:', err);
      throw err;
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const updatedTask = await updateTaskService(id, updatedData);
      setTasks((prev) =>
        prev.map((t) => (t._id === id || t.id === id ? updatedTask : t))
      );
    } catch (err) {
      console.error('Error actualizando tarea:', err);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskService(id);
      setTasks((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    } catch (err) {
      console.error('Error eliminando tarea:', err);
      throw err;
    }
  };

  return (
    <TaskContext.Provider 
      value={{ tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};