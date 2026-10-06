import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EmptyCompletedTasks = () => {
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

        {/* Icono principal con animación flotante */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-tr from-[#FFC50C] to-amber-300 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-105 animate-[float_3s_ease-in-out_infinite]">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
      </div>

      {/* Título */}
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-2">
        Aún no has completado ninguna tarea
      </h3>

      {/* Descripción */}
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6">
        Marca el checkbox de una tarea en el Dashboard para moverla a este
        apartado y llevar el registro de tus logros.
      </p>

      {/* Botón para ir al Dashboard */}
      <button
        onClick={() => navigate('/dashboard')}
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        <span>Ir al Dashboard</span>
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

export default EmptyCompletedTasks;