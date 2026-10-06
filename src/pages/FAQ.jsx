import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FAQ = () => {
  const navigate = useNavigate();
  
  // Estado para controlar qué pregunta está abierta (guarda el índice o null)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es RemindMe! y cómo funciona?",
      answer: "RemindMe! es una aplicación inteligente de gestión de tareas diseñada para mantenerte al día con tus pendientes de forma rápida, visual y organizada. Te permite crear, completar y sincronizar tus recordatorios con herramientas modernas."
    },
    {
      question: "¿Cómo funciona la integración con Telegram?",
      answer: "Nuestra integración con Telegram te permite recibir notificaciones y alertas directamente en tu chat de mensajería favorito, asegurándose de que nunca se te pase una tarea importante sin importar dónde estés."
    },
    {
      question: "¿Cómo puedo cambiar entre el Modo Claro y el Modo Oscuro?",
      answer: "Es facilísimo. En la parte inferior de la barra lateral (sidebar) encontrarás un interruptor diseñado para alternar de forma instantánea entre el modo claro y el modo oscuro según tu preferencia visual."
    },
    {
      question: "¿Mis tareas se guardan de forma segura?",
      answer: "¡Así es! Todas tus tareas y datos de perfil se gestionan de manera segura dentro de la sesión de la aplicación, permitiéndote consultar tu historial de pendientes y tareas completadas en cualquier momento."
    },
    {
      question: "¿Cómo marco una tarea como completada?",
      answer: "Desde tu Dashboard principal, puedes hacer clic en el botón de acción o check correspondiente a cada tarea para moverla automáticamente a la sección de 'Completadas' y llevar un control de tus logros diarios."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300 flex flex-col justify-between">
      
      <div className="max-w-3xl mx-auto w-full">
        
        {/* ENCABEZADO DE LA VISTA */}
        <div className="flex items-center justify-between mb-8">
          <div>
           
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              Preguntas <span className="text-[#FFC50C]">Frecuentes</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Encuentra respuestas rápidas a las dudas más comunes sobre el uso de RemindMe!
            </p>
          </div>

          {/* BOTÓN VOLVER AL DASHBOARD */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Volver</span>
          </button>
        </div>

        {/* LISTA DE ACORDEONES (FAQS) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* BOTÓN / PREGUNTA */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${
                      isOpen ? 'bg-[#FFC50C] text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      ?
                    </div>
                    <span className="text-base tracking-tight">{faq.question}</span>
                  </div>

                  {/* ICONO DE FLECHA ROTATIVA */}
                  <div className={`w-6 h-6 flex items-center justify-center text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FFC50C]' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* RESPUESTA DESPLEGABLE */}
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TARJETA DE SOPORTE ADICIONAL */}
        <div className="mt-10 bg-linear-to-r from-amber-400 to-[#FFC50C] rounded-3xl p-6 md:p-8 text-slate-900 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-black tracking-tight">¿Tienes alguna otra duda?</h2>
            <p className="text-slate-900/80 text-sm">Nuestro equipo de soporte o la comunidad está listo para echarte una mano.</p>
          </div>
          <button 
            onClick={() => alert("¡Pronto habilitaremos el canal de soporte directo.")}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Contáctanos
          </button>
        </div>

      </div>

      {/* FOOTER SIMPLE */}
      <footer className="text-center text-xs text-slate-400 dark:text-slate-600 mt-12">
        RemindMe! &copy; 2026 — Todos los derechos reservados.
      </footer>

    </div>
  );
};

