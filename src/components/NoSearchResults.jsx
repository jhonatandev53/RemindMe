import React from 'react';
import { Panel } from './Panel';

export const NoSearchResults = ({ searchTerm, onClear }) => {
  return (
    <Panel className="flex flex-col items-center justify-center p-8 sm:p-12 text-center w-full min-h-105 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-dashed border-slate-300 dark:border-slate-800 transition-all duration-300 col-span-full">
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
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Título */}
      <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
        No se encontraron coincidencias para &quot;{searchTerm}&quot;
      </h4>

      {/* Descripción */}
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6">
        Prueba escribiendo otro término o limpia el buscador para ver todas las
        tareas.
      </p>

      {/* Botón de limpiar búsqueda */}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="px-6 py-3 bg-[#FFC50C] hover:bg-amber-400 text-slate-900 font-extrabold text-sm rounded-2xl shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2 group"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>

          <span>Limpiar búsqueda</span>
        </button>
      )}

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
    </Panel>
  );
};

export default NoSearchResults;