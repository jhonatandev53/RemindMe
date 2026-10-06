import { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel } from '../components/Panel';
import { useNavigate } from 'react-router-dom';

// Componente FlipCard Reutilizable para los banners principales
const FlipCard = ({ title, icon, topGradient, bgShapes, children }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-70 sm:h-67.5 w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(prev => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-600"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        {/* FRENTE DE LA TARJETA (Solo Título e Icono SVG en Amarillo RemindMe, sin formas geométricas ni texto de ayuda) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Panel className="w-full h-full p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Banda de acento superior */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${topGradient} z-20`} />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-[#FFC50C] flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-700">
                {icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                {title}
              </h2>
            </div>
          </Panel>
        </div>

        {/* PARTE DE ATRÁS DE LA TARJETA (Formas geométricas y Explicación) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <Panel className="w-full h-full p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            {/* Banda de acento superior */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${topGradient} z-20`} />

            {/* Formas geométricas de fondo (SOLO EN LA PARTE DE ATRÁS) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {bgShapes}
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full overflow-y-auto pr-1">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white mb-3">
                  {title}
                </h3>
                {children}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

// Componente FlipCard específico para los problemas que solucionamos
const ProblemFlipCard = ({ title, icon, bgShapes, children }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-50 sm:h-52.5 w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(prev => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-600"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        {/* Frente del problema */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-slate-50/90 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-md">
            <div className="w-12 h-12 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 text-[#FFC50C] flex items-center justify-center mb-3 border border-slate-300 dark:border-slate-600">
              {icon}
            </div>
            <h4 className="font-extrabold text-slate-800 dark:text-white text-base">
              {title}
            </h4>
          </div>
        </div>

        {/* Atrás del problema */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="w-full h-full bg-slate-50/90 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center shadow-md">
            {/* Formas geométricas en la parte trasera */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {bgShapes}
            </div>
            <div className="relative z-10">
              <h4 className="font-extrabold text-slate-800 dark:text-white mb-2 text-sm sm:text-base">
                {title}
              </h4>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-100px)] px-4 sm:px-6 py-8 max-w-7xl mx-auto"
    >
      {/* SECCIÓN HERO / ENCABEZADO */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
          ¿Qué es <span className="text-[#FFC50C]">RemindMe</span>?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Mucho más que una aplicación de recordatorios: tu compañero definitivo para dominar el tiempo, mantener el enfoque y no volver a olvidar nada importante en el día a día.
        </p>
      </div>

      {/* GRID: ¿CÓMO SURGIÓ Y QUIÉN ES EL CREADOR? */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* ¿Cómo surgió? */}
        <FlipCard
          title="¿Cómo surgió RemindMe?"
          topGradient="from-amber-400 via-[#FFC50C] to-orange-500"
          icon={
            <svg className="w-7 h-7 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          bgShapes={
            <>
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFC50C]/25 dark:bg-[#FFC50C]/15 rounded-3xl rotate-12" />
              <div className="absolute top-1/3 -left-12 w-28 h-48 bg-orange-500/20 dark:bg-orange-500/15 rounded-3xl -rotate-12" />
              <div className="absolute -bottom-14 right-1/4 w-48 h-24 bg-amber-400/25 dark:bg-amber-400/15 rounded-2xl rotate-45" />
            </>
          }
        >
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            RemindMe nació de la necesidad real de simplificar la gestión del tiempo personal. En un entorno digital saturado de herramientas ruidosas y complejas, concebimos un espacio ágil, minimalista y directo al grano.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Lo que inició como un proyecto enfocado en arquitectura web moderna y desarrollo de software escalable, evolucionó hasta convertirse en una plataforma funcional con alertas inteligentes y sincronización directa con Telegram.
          </p>
        </FlipCard>

        {/* El Creador */}
        <FlipCard
          title="Detrás de la idea: El Creador"
          topGradient="from-orange-500 via-[#FFC50C] to-amber-400"
          icon={
            <svg className="w-7 h-7 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          bgShapes={
            <>
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFC50C]/25 dark:bg-[#FFC50C]/15 rounded-3xl rotate-12" />
              <div className="absolute top-1/3 -left-12 w-28 h-48 bg-orange-500/20 dark:bg-orange-500/15 rounded-3xl -rotate-12" />
              <div className="absolute -bottom-14 right-1/4 w-48 h-24 bg-amber-400/25 dark:bg-amber-400/15 rounded-2xl rotate-45" />
            </>
          }
        >
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            Detrás de cada línea de código, diseño de interfaz y lógica de RemindMe está <strong className="text-slate-900 dark:text-white font-extrabold">Jhonatan Londoño</strong>, un desarrollador apasionado por la tecnología, la innovación web y la creación de soluciones digitales útiles.
          </p>
          <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              "Crear RemindMe has sido un viaje increíble de desarrollo y constante evolución, aplicando las mejores prácticas de ingeniería de software para ofrecer una experiencia fluida." — Jhonatan L.
            </p>
          </div>
        </FlipCard>

      </div>

      {/* MISIÓN Y VISIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* Misión */}
        <FlipCard
          title="Nuestra Misión"
          topGradient="from-emerald-400 via-teal-500 to-emerald-600"
          icon={
            <svg className="w-7 h-7 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          bgShapes={
            <>
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-3xl rotate-12" />
              <div className="absolute top-1/3 -left-12 w-28 h-48 bg-teal-500/15 dark:bg-teal-500/10 rounded-3xl -rotate-12" />
            </>
          }
        >
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Empoderar a las personas mediante una herramienta de organización intuitiva, rápida y accesible, permitiéndoles optimizar su tiempo, reducir el estrés por olvidos y cumplir todas sus metas diarias con total tranquilidad.
          </p>
        </FlipCard>

        {/* Visión */}
        <FlipCard
          title="Nuestra Visión"
          topGradient="from-sky-400 via-blue-500 to-indigo-600"
          icon={
            <svg className="w-7 h-7 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
          bgShapes={
            <>
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-400/20 dark:bg-sky-400/10 rounded-3xl rotate-12" />
              <div className="absolute top-1/3 -left-12 w-28 h-48 bg-blue-500/15 dark:bg-blue-500/10 rounded-3xl -rotate-12" />
            </>
          }
        >
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Consolidarnos como el asistente de recordatorios y productividad de confianza, destacando por nuestra conectividad inteligente con plataformas de mensajería y una experiencia de usuario impecable.
          </p>
        </FlipCard>

      </div>

      {/* PROBLEMAS QUE BUSCAMOS SOLUCIONAR */}
      <Panel className="p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md relative overflow-hidden mb-8">
        
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#FFC50C] via-orange-500 to-amber-500 z-20" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#FFC50C]/20 dark:bg-[#FFC50C]/10 rounded-3xl -rotate-12" />
          <div className="absolute bottom-10 -right-10 w-36 h-36 bg-orange-500/15 dark:bg-orange-500/10 rounded-3xl rotate-45" />
        </div>

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-2">
              ¿Qué problemas buscamos solucionar?
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Diseñamos RemindMe para erradicar los dolores de cabeza más comunes en la gestión del tiempo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Problema 1 */}
            <ProblemFlipCard
              title="El olvido de tareas clave"
              icon={
                <svg className="w-6 h-6 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              bgShapes={
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-red-500/15 rounded-2xl rotate-12" />
              }
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Evitamos que las responsabilidades importantes se pierdan en medio del ritmo acelerado del día a día.
              </p>
            </ProblemFlipCard>

            {/* Problema 2 */}
            <ProblemFlipCard
              title="Aplicaciones saturadas"
              icon={
                <svg className="w-6 h-6 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              bgShapes={
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-amber-500/15 rounded-2xl -rotate-12" />
              }
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Eliminamos interfaces complejas o llenas de funciones innecesarias que dificultan apuntar un recordatorio rápido.
              </p>
            </ProblemFlipCard>

            {/* Problema 3 */}
            <ProblemFlipCard
              title="Desconexión con chats"
              icon={
                <svg className="w-6 h-6 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              bgShapes={
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-sky-500/15 rounded-2xl rotate-45" />
              }
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Integramos notificaciones directamente donde ya interactúas (como Telegram), garantizando que las veas a tiempo.
              </p>
            </ProblemFlipCard>

          </div>
        </div>
      </Panel>

      {/* BOTÓN DE RETORNO */}
      <div className="text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="py-3 px-8 bg-[#FFC50C] hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-[#FFC50C]/30 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span>Volver al Inicio</span>
        </button>
      </div>

    </motion.div>
  );
};

export default About;