import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

export const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-[#FFC50C]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">¡Todo al día!</h3>
        <p className="text-slate-500 text-sm max-w-sm">
          No tienes tareas pendientes. ¡Crea una para organizar tu día!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};