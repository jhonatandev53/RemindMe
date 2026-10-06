import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from './Panel';
import { motion } from 'framer-motion';

export const Tutorial = () => {
  const navigate = useNavigate();

  // Lista de características explicadas paso a paso
  const guideSteps = [
    {
      id: 1,
      title: 'Creación de Tareas',
      description:
        'Agrega nuevas tareas indicando un título obligatorio, una fecha y una hora. Puedes adjuntar una descripción detallada y personalizar la tarjeta con el color que prefieras para mantener todo ordenado.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Completar Tareas',
      description:
        'Haz clic en el checkbox de cualquier tarea pendiente para marcarla como completada. Al hacerlo, se moverá automáticamente a tu sección de Tareas Completadas para llevar un registro limpio de tus logros.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Actualización y Colores',
      description:
        'Edita el contenido de tus tareas pendientes cuando lo necesites. Nota de seguridad importante: si una tarea está marcada como completada, sus textos y fechas estarán bloqueados hasta que la desmarques primero.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Eliminación Segura',
      description:
        'Elimina las tareas que ya no necesites directamente desde la tarjeta. Al igual que con la edición, las tareas completadas están protegidas contra eliminación accidental; debes desmarcarlas antes de poder borrarlas.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
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
      ),
    },
    {
      id: 5,
      title: 'Aislamiento Multiusuario',
      description:
        'Tu cuenta es totalmente privada. Cada usuario cuenta con su propia base de datos aislada, lo que significa que tus tareas, configuraciones y datos de perfil son únicos y seguros frente a otros usuarios.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Notificaciones por Telegram',
      description:
        'Conecta tu Chat ID de Telegram vinculando al bot oficial. Esto te permite preparar el terreno para recibir alertas y recordatorios directos en tu dispositivo móvil sobre tus pendientes importantes.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
    },
    {
      id: 7,
      title: 'Navegación por Teclado',
      description:
        'Muévete al instante sin usar el mouse. Usa [D] Dashboard, [C] Completadas, [T] Telegram, [P] Perfil, [N] Nueva tarea y [S] para buscar. Cuentan con un filtro inteligente para no interrumpir cuando escribes en los inputs.',
      icon: (
        <svg
          className="w-7 h-7 text-slate-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-between">
      <div>
        {/* CABECERA PRINCIPAL */}
        <Panel className="p-6 sm:p-8 rounded-2xl shadow-sm mb-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
                Guía Completa de RemindMe!
              </h2>

              <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Aprende paso a paso todas las herramientas disponibles para
                dominar la organización de tus tareas de manera ágil, segura y
                eficiente.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3 bg-[#FFC50C] hover:bg-amber-400 text-slate-900 font-extrabold text-sm rounded-2xl shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>

              <span>Volver al Dashboard</span>
            </button>
          </div>
        </Panel>

        {/* CUADRÍCULA DE PASOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Panel className="p-6 rounded-2xl shadow-sm h-full flex flex-col justify-between hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all duration-300 group">
                <div>
                  {/* ICONO Y NÚMERO DE PASO */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-linear-to-tr from-[#FFC50C] to-amber-300 rounded-2xl flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>

                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                      Paso {step.id < 10 ? `0${step.id}` : step.id}
                    </span>
                  </div>

                  {/* TÍTULO Y DESCRIPCIÓN */}
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-extrabold text-amber-500 dark:text-amber-400">
                  <span>RemindMe! Sistema Dinámico</span>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PIE DE PÁGINA INFORMATIVO */}
      <div className="mt-12 text-center py-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          RemindMe! - Todos los derechos reservados. Diseñado para ofrecer la
          máxima privacidad y productividad.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;