import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';


export const WelcomeGreeting = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.name || user?.username || "Crack";
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsVisible(false);
      return;
    }

    const startTime = sessionStorage.getItem('welcome_start_time');

    // Si por alguna razón entra al dashboard sin pasar por el login, le creamos su tiempo
    if (!startTime) {
      const now = Date.now().toString();
      sessionStorage.setItem('welcome_start_time', now);
    }

    const activeStart = parseInt(sessionStorage.getItem('welcome_start_time'), 10);
    const now = Date.now();
    const elapsed = now - activeStart;
    const duration = 30000; // 30 segundos exactos
    const remaining = duration - elapsed;

    if (remaining > 0) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, remaining);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [user]);

  // Saludo y mensaje aleatorio
  const [greeting] = useState(() => {
    const hour = new Date().getHours();

    const morningMessages = [
      { title: "¡Buenos días", message: "¡A romperla este día con toda la energía! " },
      { title: "¡Arriba", message: "Es hora de darle con fuerza a tus pendientes " },
      { title: "¡Excelente mañana", message: "Cada tarea de hoy es un paso más hacia tu meta " },
      { title: "Que día no?", message: "Perfecto para darle con toda! "}
    ];

    const afternoonMessages = [
      { title: "¡Buenas tardes", message: "¡Mantén el ritmo, ya falta menos para coronar el día! " },
      { title: "¡Qué tal tu tarde", message: "Es un gran momento para avanzar con tus tareas " },
      { title: "¡Buenas tardes", message: "¡A darle con toda a esta segunda mitad de la jornada! " },
      { title: "¿Cómo va esa tarde?", message: "Espero que más que bien para completar tu día "}
    ];

    const nightMessages = [
      { title: "¡Buenas noches", message: "¡Cerrando la jornada con broche de oro! " },
      { title: "¡Buena noche", message: "Un gran esfuerzo hoy merece un buen descanso después " },
      { title: "¡Buenas noches", message: "Revisa lo que lograste y prepárate para mañana " },
      { title: "Que tal esta linda noche?", message: "Tan linda como para terminarla al 100! "}
    ];

    let selectedList;
    if (hour >= 5 && hour < 12) {
      selectedList = morningMessages;
    } else if (hour >= 12 && hour < 19) {
      selectedList = afternoonMessages;
    } else {
      selectedList = nightMessages;
    }

    const randomIndex = Math.floor(Math.random() * selectedList.length);
    return selectedList[randomIndex];
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)", transition: { duration: 0.4 } }}
          className="flex flex-col items-center justify-center w-full lg:w-auto my-2 lg:my-0 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            <span>{greeting.title},</span>
            <span className="text-[#FFC50C] capitalize">{userName}!</span>
          </div>
          <p className="text-sm md:text-base font-semibold text-slate-500 dark:text-slate-400 mt-0.5 text-center">
            {greeting.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeGreeting;