import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import GradientWaves from "../components/GradientWaves";

// =========================================
// PALETA DE COLORES PASTEL
// =========================================
export const pastelColors = [
  '#FFB3BA', // Rosa pastel
  '#FFFFBA', // Amarillo suave
  '#BAFFC9', // Verde menta
  '#BAE1FF', // Azul cielo
  '#E8BAFF', // Lila
  '#1465BB',
  '#FF6C3E',
  '#FF69B4',
  '#ffff00',
  '#ab4bde',
  '#77dd77',
];

export const TaskForm = () => {
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);
  const { showToast } = useToast();

  const [task, setTask] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setTask({
      title: "",
      date: "",
      time: "",
      description: "",
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.date || !task.time) {
      setError("El título, la fecha y la hora son obligatorios.");
      showToast("Completa los campos obligatorios", "error");
      return;
    }

    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

    const taskWithColor = {
      ...task,
      color: randomColor
    };

    setError("");
    addTask(taskWithColor); 
    showToast("¡Tarea creada con éxito! 🎉");
    handleClear();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full py-8 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden">
      
      {/* FONDO: GRADIENT WAVES */}
      <div className="fixed inset-0 z-0">
        <GradientWaves
          horizonColor="#fffdf7" 
          waveColor="#FFC50C"    
          crestColor="#FF9800"   
          speed={0.6}            
          amplitude={20}         
          waveScale={1.2}        
          waveRatio={0.6}
          swell={10}
          turbulence={6}
          tilt={30}         
          zoom={0.8}            
          height={1.5}          
          fogDepth={5}          
          detail="medium"        
        />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Nueva Tarea
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 bg-white/70 dark:bg-slate-800/80 inline-block px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/40 dark:border-slate-700">
              Diseña tu objetivo en la libreta.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver al Dashboard</span>
          </button>
        </div>

        {/* CUADERNO */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFC50C]/20 rounded-3xl blur-2xl translate-y-6 -z-10" />
          <div className="absolute inset-0 bg-slate-900/10 rounded-3xl blur-xl translate-y-3 -z-10" />

          {/* CUERPO DEL CUADERNO */}
          <div className="bg-[#FFFDF7]/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-200/80 dark:border-slate-800 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] relative flex flex-col lg:flex-row overflow-hidden transition-colors">
            
            <div className="hidden lg:block absolute top-0 bottom-0 left-12 w-0.5 bg-red-400/30 pointer-events-none" />

            <div className="hidden lg:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col justify-evenly py-6 z-20 pointer-events-none">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex items-center justify-center w-12 h-3 relative">
                  <div className="absolute left-0 w-2.5 h-3.5 bg-slate-900/20 dark:bg-slate-700 rounded-full shadow-inner" />
                  <div className="absolute right-0 w-2.5 h-3.5 bg-slate-900/20 dark:bg-slate-700 rounded-full shadow-inner" />
                  <div className="w-full h-2.5 bg-linear-to-r from-slate-400 via-slate-200 to-slate-500 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 rounded-full shadow-md border border-slate-900/20 z-10" />
                </div>
              ))}
            </div>

            {/* PÁGINA IZQUIERDA */}
            <div className="flex-1 p-6 sm:p-10 lg:pr-14 lg:border-r border-dashed border-amber-200 dark:border-slate-800">
              
              {error && (
                <div className="mb-6 bg-red-50/90 dark:bg-red-950/80 backdrop-blur-sm border-l-4 border-red-500 p-3 rounded-r-xl shadow-xs">
                  <p className="text-xs font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <form id="task-form" onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 lg:pl-6">
                
                {/* OBJETIVO PRINCIPAL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Objetivo Principal
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Ej: Terminar proyecto de React..."
                    value={task.title}
                    onChange={handleChange}
                    className="w-full text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-[#FFC50C] outline-none py-1.5 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:px-2 rounded-t-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FECHA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Fecha 
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={task.date}
                      onChange={handleChange}
                      className="w-full font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-amber-50/50 dark:bg-slate-800/80 border border-amber-200/70 dark:border-slate-700 focus:border-amber-400 focus:bg-white dark:focus:bg-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:ring-3 focus:ring-[#FFC50C]/30 transition-all cursor-pointer shadow-inner"
                    />
                  </div>

                  {/* HORA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Hora
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={task.time}
                      onChange={handleChange}
                      className="w-full font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-amber-50/50 dark:bg-slate-800/80 border border-amber-200/70 dark:border-slate-700 focus:border-amber-400 focus:bg-white dark:focus:bg-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:ring-3 focus:ring-[#FFC50C]/30 transition-all cursor-pointer shadow-inner"
                    />
                  </div>
                </div>

                {/* NOTAS ADICIONALES */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Notas Adicionales
                  </label>
                  <div className="relative rounded-2xl overflow-hidden border border-amber-200/80 dark:border-slate-700 bg-transparent shadow-inner">
                    <textarea
                      name="description"
                      rows="4"
                      placeholder="Escribe el contexto de la tarea..."
                      value={task.description}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-transparent p-4 outline-none resize-none leading-7 placeholder:text-slate-300 dark:placeholder:text-slate-600 relative z-10"
                      style={{
                        backgroundImage: "linear-gradient(transparent 95%, rgba(226, 232, 240, 0.6) 95%)",
                        backgroundSize: "100% 1.75rem",
                        lineHeight: "1.75rem",
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* PÁGINA DERECHA */}
            <div className="flex-1 bg-amber-50/30 dark:bg-slate-950/40 p-6 sm:p-10 lg:pl-14 flex flex-col justify-between border-t border-dashed border-amber-200 dark:border-slate-800 lg:border-t-0">
              
              <div className="flex-1 flex flex-col items-center justify-center relative">
                
                <div className="absolute inset-0 bg-[#FFC50C]/10 blur-3xl rounded-full" />

                {/* POST-IT VISTA PREVIA (Mantiene su color clásico amarillo sin alterarse por el dark mode) */}
                <div className="w-full max-w-sm bg-linear-to-br from-[#fef49b] to-[#fde047] rounded-sm shadow-[2px_4px_10px_rgba(0,0,0,0.1)] p-6 sm:p-8 relative transition-all duration-300 ease-out hover:-translate-y-3 hover:rotate-2 hover:scale-[1.02] hover:shadow-[10px_20px_30px_rgba(0,0,0,0.15)] z-10">
                  
                  {/* CINTA ADHESIVA */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-white/40 backdrop-blur-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] -rotate-3 z-20 border-x-2 border-dashed border-black/10" />

                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-amber-800/80 flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Vista Previa
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4 text-left relative z-10">
                    <h4
                      className={`text-xl sm:text-2xl wrap-break-word leading-snug transition-colors duration-300 ${
                        task.title
                          ? "text-slate-800 font-medium font-serif italic"
                          : "text-amber-700/50 font-serif italic"
                      }`}
                    >
                      {task.title || "Tu objetivo principal aquí..."}
                    </h4>

                    {(task.date || task.time) && (
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900/70 bg-amber-200/50 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm border border-amber-300/50">
                        {task.date && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {task.date}
                          </span>
                        )}
                        {task.date && task.time && <span className="opacity-50">•</span>}
                        {task.time && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {task.time}
                          </span>
                        )}
                      </div>
                    )}

                    <p
                      className={`text-sm sm:text-base wrap-break-word line-clamp-4 transition-colors duration-300 ${
                        task.description
                          ? "text-slate-700 font-medium font-serif italic"
                          : "text-amber-700/40 font-serif italic"
                      }`}
                    >
                      {task.description || "Sin notas adicionales..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="mt-8 pt-6 border-t border-amber-200/50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3 relative z-10">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 border border-transparent transition-all duration-200 cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Limpiar</span>
                </button>

                <button
                  type="submit"
                  form="task-form"
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-7 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-900 bg-[#FFC50C] hover:bg-[#f3ba07] border border-amber-300 shadow-[0_4px_14px_0_rgba(255,197,12,0.39)] hover:shadow-[0_6px_20px_rgba(255,197,12,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guardar Tarea</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};