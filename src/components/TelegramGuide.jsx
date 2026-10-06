import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from './Panel';
import { motion } from 'framer-motion';

export const TelegramGuide = () => {
  const navigate = useNavigate();

  // Lista de pasos detallados para la integración con Telegram
  const guideSteps = [
    {
      id: 1,
      title: 'Busca a @RemindMeBot',
      description:
        'Busca a nuestro bot oficial en Telegram con el usuario @RemindMeBot desde nuestro sitio web para iniciar la vinculación.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.98-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.25z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Envía el Comando /start',
      description:
        'Inicia la conversación enviando el comando /start en el chat del bot. Esta acción activará el sistema automatizado y preparará tu canal de notificaciones.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Obtén tu Chat ID',
      description:
        'El bot responderá de forma instantánea proporcionando tu Chat ID único. Este código numérico es indispensable para identificar tu cuenta personal de usuario.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 7h2a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Sincroniza en tu Panel',
      description:
        'Regresa a la sección de configuración de Telegram en RemindMe!, introduce tu Chat ID en el formulario y haz clic en guardar para actualizar tu perfil.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Persistencia real',
      description:
        'Tu Chat ID se almacena de manera segura y persistente mediante una ruta, asegurando que tus datos estén siempre sincronizados.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Alertas Automatizadas',
      description:
        '¡Todo listo! Comienza a recibir notificaciones automáticas y recordatorios importantes sobre tus tareas pendientes directamente en tu dispositivo móvil.',
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-between">
      <div>
        {/* CABECERA PRINCIPAL */}
        <Panel className="p-6 sm:p-8 rounded-2xl shadow-sm mb-8 bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
                Guía de Automatización con Telegram
              </h2>

              <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Aprende paso a paso cómo conectar tu cuenta con nuestro bot
                oficial para recibir alertas y recordatorios inteligentes en
                tiempo real.
              </p>
            </div>

            <button
              onClick={() => navigate('/telegram')}
              className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-sky-500/25 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
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

              <span>Volver a Telegram</span>
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
              <Panel className="p-6 rounded-2xl shadow-sm h-full flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 group">
                <div>
                  {/* ICONO Y NÚMERO DE PASO */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-linear-to-tr from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-md shadow-sky-500/20 transform transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>

                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                      Paso 0{step.id}
                    </span>
                  </div>

                  {/* TÍTULO Y DESCRIPCIÓN */}
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-extrabold text-sky-500 dark:text-sky-400">
                  <span>RemindMe! Bot de Telegram</span>
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

export default TelegramGuide;