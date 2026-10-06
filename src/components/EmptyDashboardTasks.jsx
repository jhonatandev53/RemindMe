import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EmptyDashboardTasks = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center w-full min-h-105 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-dashed border-slate-300 dark:border-slate-800 transition-all duration-300"
    >
      {/* Contenedor del icono superior */}
      <div className="relative mb-6">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-[#FFC50C]/25 rounded-full filter blur-xl animate-pulse" />

        {/* Botón principal con animación flotante */}
        <button
          onClick={() => navigate('/new-task')}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-tr from-[#FFC50C] to-amber-300 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95 cursor-pointer group animate-[float_3s_ease-in-out_infinite]"
          title="Crear nueva tarea"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900 transform transition-transform duration-300 group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Título */}
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-2">
        Tu panel está listo y esperando por ti
      </h3>

      {/* Descripción */}
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6">
        Comienza a organizar tu día agregando tu primera tarea. Controla tus
        pendientes de forma rápida, ordenada y completamente privada.
      </p>

      {/* Botón de guía */}
      <button
        onClick={() => navigate('/task-guide')}
        className="px-6 py-3 bg-[#FFC50C] hover:bg-amber-400 text-slate-900 font-extrabold text-sm rounded-2xl shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>

        <span>¿Eres nuevo? ¡Ven, te enseñamos!</span>
      </button>

      {/* Keyframes para la animación flotante */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default EmptyDashboardTasks;