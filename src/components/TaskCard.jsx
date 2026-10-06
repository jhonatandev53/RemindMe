import { useState, useContext, useEffect } from "react";
import confetti from "canvas-confetti";
import { TaskContext } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import { FocusBackdrop } from "../components/FocusBackdrop";
import { CopyButton } from "../components/CopyButton";
import { TaskCheckbox } from "../components/TaskCheckbox";
import { pastelColors } from "../pages/TaskForm";

export const TaskCard = ({ task, searchTerm = "" }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const { showToast } = useToast();

  // 1. Estado local sincronizado con las props
  const [isCompleted, setIsCompleted] = useState(task.completed || false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title || "",
    date: task.date || "",
    time: task.time || "",
    description: task.description || "",
  });

  // Mantener sincronizado el estado local si task cambia desde la API
  useEffect(() => {
    setIsCompleted(task.completed || false);
  }, [task.completed]);

  const cardBackgroundColor = task.color || "#FFFDF7";

  // Función inteligente para resaltar texto coincidente con el buscador
  const highlightText = (text, highlight) => {
    if (!text) return "";
    if (!highlight || !highlight.trim()) return text;

    const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark 
          key={i} 
          className="bg-[#FFC50C] text-slate-900 font-black px-1 rounded-sm shadow-xs inline-block mx-[0.5px]"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Toggle con persistencia hacia MongoDB, confeti y toast
  const handleToggleComplete = () => {
    const newState = !isCompleted;
    setIsCompleted(newState); // Cambio visual instantáneo

    if (newState) {
      try {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.7 },
          colors: ['#F87171', '#34D399', '#60A5FA', '#FBBF24', '#A78BFA'],
          zIndex: 9999,
        });
        showToast("¡Tarea completada con éxito! 🎉");
      } catch (error) {
        console.error("Error al disparar confeti:", error);
      }
    } else {
      showToast("Tarea marcada como pendiente", "error");
    }

    updateTask(task._id, { completed: newState });
  };

  const handleStartEdit = () => {
    if (isCompleted) return;
    setEditForm({
      title: task.title || "",
      date: task.date || "",
      time: task.time || "",
      description: task.description || "",
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = () => {
    updateTask(task._id, editForm);
    setIsEditing(false);
    showToast("Tarea actualizada correctamente");
  };

  // --- FUNCIÓN DE ELIMINACIÓN CORREGIDA CON ASYNC/AWAIT Y TRY/CATCH ---
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      showToast("Tarea eliminada correctamente", "error");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      // Extraemos el mensaje personalizado del backend si existe
      const errorMessage = error.message || "No se puede eliminar la tarea";
      showToast(errorMessage, "error");
    }
  };

  return (
    <>
      <FocusBackdrop
        isVisible={isEditing}
        onClose={() => setIsEditing(false)}
      />

      <div
        style={{ backgroundColor: cardBackgroundColor }}
        className={`relative rounded-sm p-6 flex flex-col justify-between group border-t border-l border-white/40 transition-all duration-500 ease-out origin-center ${
          isEditing
            ? "z-50 scale-[1.03] md:scale-105 shadow-2xl ring-2 ring-slate-800/10 -translate-y-2"
            : "z-10 shadow-[2px_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[10px_15px_25px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02] hover:rotate-1"
        } ${isCompleted && !isEditing ? "opacity-75 grayscale-[15%]" : "opacity-100"}`}
      >
        {/* CINTA ADHESIVA */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-[2px] shadow-sm -rotate-2 border-x-2 border-dashed border-slate-300/50 pointer-events-none rounded-sm z-20" />

        {!isEditing && <CopyButton task={task} />}

        {isEditing ? (
          /* MODO EDICIÓN */
          <div className="flex flex-col gap-4 relative z-10 transition-opacity duration-300 opacity-100">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Objetivo
              </label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full px-3.5 py-2 rounded-sm border border-white/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-bold text-slate-800 transition-all shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  className="w-full px-2.5 py-1.5 rounded-sm border border-white/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs font-semibold text-slate-700 cursor-pointer shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Hora
                </label>
                <input
                  type="time"
                  name="time"
                  value={editForm.time}
                  onChange={handleEditChange}
                  className="w-full px-2.5 py-1.5 rounded-sm border border-white/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs font-semibold text-slate-700 cursor-pointer shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Notas
              </label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows="3"
                className="w-full px-3 py-2 rounded-sm border border-white/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs font-medium text-slate-700 resize-none shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Color de Tarjeta
              </label>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {pastelColors &&
                  pastelColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setEditForm({ ...editForm, color: col })}
                      className={`w-7 h-7 rounded-full transition-all cursor-pointer border-2 ${
                        editForm.color === col
                          ? "scale-110 border-slate-900 shadow-md ring-2 ring-slate-900/30"
                          : "border-slate-300 hover:scale-105 shadow-sm"
                      }`}
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-2 px-4 rounded-sm text-xs transition-all cursor-pointer shadow-sm active:scale-95 flex justify-center items-center gap-1.5"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-white/50 hover:bg-white/80 border border-white/60 text-slate-800 font-bold py-2 px-4 rounded-sm text-xs transition-all cursor-pointer active:scale-95 shadow-sm flex justify-center items-center gap-1.5"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* VISTA NORMAL */
          <div className="flex flex-col h-full justify-between relative z-10 gap-3 mt-3 transition-opacity duration-300 opacity-100">
            <div>
              <div className="flex items-start gap-3 mb-3 pr-6">
                <div className="mt-1">
                  <TaskCheckbox
                    completed={isCompleted}
                    onToggle={handleToggleComplete}
                  />
                </div>
                <h3
                  className={`text-xl font-black leading-snug break-all font-serif transition-all duration-300 ${
                    isCompleted
                      ? "text-slate-500/70 line-through decoration-slate-500/50 decoration-2"
                      : "text-slate-800"
                  }`}
                >
                  {highlightText(task.title, searchTerm)}
                </h3>
              </div>

              {(task.date || task.time) && (
                <div
                  className={`flex flex-wrap gap-2 mb-3 transition-opacity ${
                    isCompleted ? "opacity-60" : "opacity-100"
                  }`}
                >
                  {task.date && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/5 text-slate-800 text-[11px] font-bold rounded-sm border border-black/5">
                      <svg
                        className="w-3.5 h-3.5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {task.date}
                    </span>
                  )}
                  {task.time && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/5 text-slate-800 text-[11px] font-bold rounded-sm border border-black/5">
                      <svg
                        className="w-3.5 h-3.5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {task.time}
                    </span>
                  )}
                </div>
              )}

              {task.description && (
                <div className="mt-2">
                  <p
                    className={`text-sm leading-relaxed font-serif italic break-all transition-all ${
                      isCompleted
                        ? "text-slate-500/60 line-through decoration-slate-500/30"
                        : "text-slate-700"
                    } ${!isExpanded ? "line-clamp-1" : ""}`}
                  >
                    {highlightText(task.description, searchTerm)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 underline mt-1.5 cursor-pointer focus:outline-none block"
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </button>
                </div>
              )}
            </div>

            {/* BOTONES CON VALIDACIÓN */}
            <div className="flex items-center gap-2 pt-3 mt-4 border-t border-black/10 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
              <button
                disabled={isCompleted}
                onClick={handleStartEdit}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-sm text-xs font-bold transition-all border ${
                  isCompleted
                    ? "opacity-40 bg-black/5 border-transparent text-slate-500 cursor-not-allowed"
                    : "bg-white/60 lg:bg-white/40 hover:bg-white/70 text-slate-800 cursor-pointer border-transparent lg:hover:border-white/60 active:scale-95"
                }`}
                title={
                  isCompleted
                    ? "Desmarca la tarea para poder editarla"
                    : "Editar tarea"
                }
              >
                Editar
              </button>

              <button
                disabled={isCompleted}
                onClick={handleDelete}
                className={`flex items-center justify-center p-1.5 rounded-sm transition-all border ${
                  isCompleted
                    ? "opacity-40 bg-black/5 border-transparent text-slate-400 cursor-not-allowed"
                    : "bg-white/60 lg:bg-white/40 hover:bg-red-500 hover:text-white text-red-600 cursor-pointer border-transparent lg:hover:border-red-500 active:scale-95"
                }`}
                title={
                  isCompleted
                    ? "Desmarca la tarea para poder eliminarla"
                    : "Eliminar tarea"
                }
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};