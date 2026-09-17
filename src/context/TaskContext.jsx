import { createContext, useState, useEffect } from 'react';
import { 
  getTasksRequest, 
  createTaskRequest, 
  deleteTaskRequest, 
  updateTaskRequest 
} from '../api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde el backend al iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksRequest();
        setTasks(data);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await createTaskRequest(taskData);
      setTasks([...tasks, newTask]); // Agregamos la tarea devuelta por MongoDB
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      // Filtramos usando _id porque ahora viene de MongoDB
      setTasks(tasks.filter(task => task._id !== id)); 
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const savedTask = await updateTaskRequest(id, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? savedTask : task)));
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};