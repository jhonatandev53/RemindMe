import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

export const TaskForm = () => {
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleClear = () => {
    setTask({ title: '', date: '', time: '', description: '' });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!task.title || !task.date || !task.time) {
      setError('El título, la fecha y la hora son obligatorios para el recordatorio.');
      return;
    }

    setError('');
    addTask(task);
    setTask({ title: '', date: '', time: '', description: '' });
    navigate('/dashboard');
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-4 sm:py-8 px-3 sm:px-6 flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-10 xl:gap-16 select-none">
      
      {/* 🌟 FONDO DE ESCRITORIO (DOT GRID) */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] .background-size:24px_24px opacity-60 pointer-events-none rounded-3xl" />

      {/* =========================================
          COLUMNA 1: LA LIBRETA (FORMULARIO)
          ========================================= */}
      <div className="flex-1 w-full max-w-3xl relative z-10">
        
        {/* HEADER DE LA SECCIÓN */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Programar Recordatorio
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 sm:mt-1">
              Escribe los detalles en tu libreta de tareas.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver</span>
          </button>
        </div>

        {/* CONTENEDOR TIPO AGENDA */}
        <div className="relative mt-2 sm:mt-4">
          <div className="absolute inset-0 bg-[#FFC50C] rounded-2xl sm:rounded-3xl translate-x-1.5 translate-y-2.5 sm:translate-x-3 sm:translate-y-4 shadow-xl -z-10" />

          <div className="bg-[#FFFDF7] border border-amber-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-lg relative overflow-hidden pl-10 sm:pl-16">
            
            {/* ANILLOS */}
            <div className="absolute top-0 bottom-0 left-1.5 sm:left-4 flex flex-col justify-around py-6 sm:py-8 z-20 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 sm:w-2.5 h-3 sm:h-3.5 bg-slate-900/15 rounded-full shadow-inner" />
                  <div className="w-5 sm:w-7 h-2.5 sm:h-3 .bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 rounded-full shadow-md -ml-3 sm:-ml-4 border border-slate-900/30" />
                </div>
              ))}
            </div>

            {/* LÍNEA ROJA */}
            <div className="absolute top-0 bottom-0 left-8 sm:left-14 w-2px bg-red-400/30 pointer-events-none" />

            {error && (
              <div className="relative z-10 mb-4 sm:mb-6 bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-xl shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>📌</span> ¿Qué tienes que hacer?
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Ej: Estudiar Node.js"
                  value={task.title}
                  onChange={handleChange}
                  className="w-full text-base sm:text-xl font-bold text-slate-800 bg-transparent border-b-2 border-slate-200 focus:border-[#FFC50C] outline-none py-1.5 sm:py-2 transition-colors placeholder:text-slate-300 placeholder:font-normal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>📅</span> Fecha
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={task.date}
                    onChange={handleChange}
                    className="w-full font-bold text-xs sm:text-sm text-slate-700 bg-amber-50/50 border border-amber-200/60 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 outline-none focus:ring-2 focus:ring-[#FFC50C]/50 transition-all cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>⏰</span> Hora
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={task.time}
                    onChange={handleChange}
                    className="w-full font-bold text-xs sm:text-sm text-slate-700 bg-amber-50/50 border border-amber-200/60 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 outline-none focus:ring-2 focus:ring-[#FFC50C]/50 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>📝</span> Detalles adicionales
                </label>
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-amber-200/80 bg-[#FFFDF7]">
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Escribe aquí los detalles de la tarea..."
                    value={task.description}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm font-medium text-slate-700 bg-transparent p-3 sm:p-4 outline-none resize-none leading-6 sm:leading-7 placeholder:text-slate-300 relative z-10"
                    style={{
                      backgroundImage: 'linear-gradient(transparent 95%, #e2e8f0 95%)',
                      backgroundSize: '100% 1.5rem',
                      lineHeight: '1.5rem'
                    }}
                  />
                </div>
              </div>

              {/* 🎯 BARRA DE ACCIONES CON TAMAÑOS COMPACTOS EN MÓVIL (h-9 vs h-12) */}
              <div className="flex items-center justify-between pt-2 sm:pt-4 gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                
                {/* 🧹 BOTÓN BORRADOR */}
                <button
                  type="button"
                  onClick={handleClear}
                  title="Limpiar formulario"
                  className="group relative flex items-center h-9 sm:h-12 hover:scale-[1.02] active:scale-[0.98] transition-transform drop-shadow-md cursor-pointer"
                >
                  <div className="h-full bg-[#E05252] border-2 border-slate-900 rounded-l-xl sm:rounded-l-2xl px-2.5 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 relative z-20">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="font-black text-white text-[10px] sm:text-sm tracking-wider uppercase">Limpiar</span>
                  </div>

                  <div className="h-full w-1.5 sm:w-2.5 bg-[#E2E8F0] border-y-2 border-slate-900 relative z-30 -ml-2px" />

                  <div className="h-full bg-[#3B82F6] border-2 border-slate-900 rounded-r-xl sm:rounded-r-2xl px-2.5 sm:px-4 flex items-center justify-center relative z-20 -ml-2px">
                    <span className="font-black text-white text-[10px] sm:text-sm tracking-wider uppercase">Borrar</span>
                  </div>
                </button>

                {/* ✏️ BOTÓN LÁPIZ */}
                <button
                  type="submit"
                  className="group relative flex items-center h-9 sm:h-12 hover:scale-[1.02] active:scale-[0.98] transition-transform drop-shadow-md cursor-pointer"
                >
                  <div className="h-full w-7 sm:w-12 bg-[#FF69B4] border-2 border-slate-900 rounded-l-xl sm:rounded-l-2xl flex items-center justify-center relative z-40">
                    <div className="w-1 sm:w-2 h-4 sm:h-6 bg-white/40 rounded-full" />
                  </div>

                  <div className="h-full w-6 sm:w-10 bg-slate-300 border-2 border-slate-900 flex items-center justify-evenly py-1 sm:py-1.5 relative z-30 -ml-2px">
                    <div className="w-1px sm:w-[1.5px] h-full bg-slate-400" />
                    <div className="w-1px sm:w-[1.5px] h-full bg-slate-100" />
                    <div className="w-1px sm:w-[1.5px] h-full bg-slate-400" />
                  </div>

                  <div className="h-full bg-[#FFC50C] border-2 border-slate-900 px-2.5 sm:px-6 flex items-center justify-center relative z-20 -ml-2px]overflow-hidden">
                    <div className="absolute top-1.5 sm:top-3 left-0 right-0 h-[1.5px] sm:h-2px bg-amber-600/30 pointer-events-none" />
                    <div className="absolute bottom-1.5 sm:bottom-3 left-0 right-0 h-[1.5px] sm:h2px bg-amber-600/30 pointer-events-none" />

                    <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 font-black text-slate-900 tracking-wider text-[10px] sm:text-sm uppercase whitespace-nowrap">
                      <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Guardar Recordatorio</span>
                    </div>
                  </div>

                  <div className="h-full w-7 sm:w-12 relative .flex-shrink-0 z-10 -ml-2px">
                    <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path d="M 0,1 Q 8,24 0,47 L 46,24 Z" fill="#FEF08A" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M 31,16 L 46,24 L 31,32 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>

      {/* =========================================
          COLUMNA 2: POST-IT DINÁMICO (VISTA PREVIA)
          ========================================= */}
      <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-20 mt-4 lg:mt-24 relative z-10">
        <div className="relative bg-[#FEF08A] rounded-sm p-5 sm:p-6 shadow-[4px_4px_15px_rgba(0,0,0,0.1)] rotate-1 sm:rotate-3 hover:rotate-1 transition-all duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-6 sm:h-7 bg-white/50 backdrop-blur-sm rotate--3deg shadow-sm" />

          {task.title || task.date || task.time || task.description ? (
            <div className="flex flex-col gap-2.5 sm:gap-3 min-h-140px sm:min-h-160px">
               <h3 className="font-black text-lg sm:text-xl text-slate-800 border-b-2 border-amber-300/50 pb-2 .break-words leading-tight">
                 {task.title || "Sin título..."}
               </h3>
               
               {(task.date || task.time) && (
                 <div className="flex flex-col gap-0.5 text-xs sm:text-sm font-bold text-slate-600">
                   {task.date && <span>📅 {task.date}</span>}
                   {task.time && <span>⏰ {task.time}</span>}
                 </div>
               )}

               {task.description && (
                 <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 sm:mt-2 leading-relaxed whitespace-pre-wrap .break-words">
                   {task.description}
                 </p>
               )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-36 sm:h-48 text-center gap-2 sm:gap-3 opacity-60">
              <span className="text-3xl sm:text-4xl animate-bounce">💡</span>
              <p className="font-bold text-slate-700 text-xs sm:text-sm">
                ¡Vista Previa!<br/>
                <span className="font-medium text-[10px] sm:text-xs mt-0.5 block">Escribe en tu libreta para ver cómo quedará tu recordatorio.</span>
              </p>
            </div>
          )}

          <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 .bg-gradient-to-tl from-amber-300 to-transparent shadow-[-2px_-2px_5px_rgba(0,0,0,0.03)] rounded-tl-xl pointer-events-none" />
        </div>
      </div>

    </div>
  );
};