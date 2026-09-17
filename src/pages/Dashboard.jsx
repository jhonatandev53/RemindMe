import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; 

export const Dashboard = () => {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', date: '', time: '', description: '' });

  const handleStartEdit = (task) => {
    setEditingId(task._id);
    setEditForm({ title: task.title, date: task.date, time: task.time, description: task.description });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveEdit = (id) => {
    updateTask(id, editForm);
    setEditingId(null); 
  };

  return (
    <div className="space-y-6">
      
      {/* Header Superior del Dashboard */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Mis Recordatorios
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Organiza tus tareas y potencia tu productividad.
          </p>
        </div>

        {/* Tarjeta de usuario */}
        <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="w-9 h-9 rounded-xl bg-[#FFC50C] flex items-center justify-center font-black text-slate-900 shadow-sm">
            JD
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-800 leading-tight">Jhonatan</p>
            <p className="text-[11px] text-slate-400 font-semibold">Usuario Pro</p>
          </div>
        </div>
      </header>

      {/* Resumen */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Panel de Tareas</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Tienes <span className="font-bold text-[#FFC50C]">{tasks.length}</span> {tasks.length === 1 ? 'tarea registrada' : 'tareas registradas'}
          </p>
        </div>
      </div>

      {/* Lista / Grid de Tareas */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-[#FFC50C]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">¡Todo al día!</h3>
          <p className="text-slate-500 text-sm max-w-sm">No tienes tareas pendientes. ¡Crea una para organizar tu día!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {editingId === task._id ? (
                /* MODO EDICIÓN */
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#FFC50C] text-xs font-extrabold uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editando Tarea
                  </div>
                  
                  <input 
                    type="text" 
                    name="title" 
                    value={editForm.title} 
                    onChange={handleEditChange} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFC50C] text-sm font-semibold text-slate-800"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      name="date" 
                      value={editForm.date} 
                      onChange={handleEditChange} 
                      className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFC50C] text-xs font-medium text-slate-700"
                    />
                    <input 
                      type="time" 
                      name="time" 
                      value={editForm.time} 
                      onChange={handleEditChange} 
                      className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFC50C] text-xs font-medium text-slate-700"
                    />
                  </div>

                  <textarea 
                    name="description" 
                    value={editForm.description} 
                    onChange={handleEditChange} 
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFC50C] text-sm text-slate-700 resize-none"
                  />

                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleSaveEdit(task._id)} 
                      className="flex-1 bg-[#FFC50C] hover:bg-amber-400 text-slate-900 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      Guardar
                    </button>
                    <button 
                      onClick={() => setEditingId(null)} 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* VISTA NORMAL */
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-3 leading-snug">
                      {task.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.date && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                          <svg className="w-3.5 h-3.5 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {task.date}
                        </span>
                      )}
                      {task.time && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                          <svg className="w-3.5 h-3.5 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.time}
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 italic">
                        "{task.description}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-2">
                    <button 
                      onClick={() => handleStartEdit(task)} 
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer border border-amber-200/50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    
                    <button 
                      onClick={() => deleteTask(task._id)} 
                      className="flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors cursor-pointer border border-red-100"
                      title="Eliminar tarea"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};