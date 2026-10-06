import { useState, useEffect } from 'react';

export const CurrentTimeWidget = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Actualizar la hora cada segundo en tiempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const monthName = dateTime
    .toLocaleDateString('es-ES', { month: 'short' })
    .toUpperCase();

  const dayNumber = dateTime.getDate();

  const weekdayName = dateTime.toLocaleDateString('es-ES', {
    weekday: 'short',
  });

  const year = dateTime.getFullYear();

  // Formatear la hora local en formato de 12 horas con AM/PM
  const formattedTime = dateTime.toLocaleTimeString('es-ES', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl px-3 py-2 pt-4 shadow-xs backdrop-blur-md shrink-0 gap-2.5 sm:gap-3">
      {/* Aros metálicos plateados superiores */}
      <div className="absolute -top-1.5 left-5 right-5 sm:left-6 sm:right-6 flex justify-around px-2 pointer-events-none">
        <div className="w-2 h-3.5 bg-linear-to-b from-slate-100 via-slate-300 to-slate-500 rounded-full border border-slate-400 shadow-xs" />
        <div className="w-2 h-3.5 bg-linear-to-b from-slate-100 via-slate-300 to-slate-500 rounded-full border border-slate-400 shadow-xs" />
        <div className="w-2 h-3.5 bg-linear-to-b from-slate-100 via-slate-300 to-slate-500 rounded-full border border-slate-400 shadow-xs" />
      </div>

      {/* Mini Calendario */}
      <div className="flex flex-col rounded-xl overflow-hidden shadow-xs border border-amber-400/30 bg-white dark:bg-slate-900 shrink-0">
        {/* Cabecera amarilla */}
        <div className="bg-[#FFC50C] text-slate-950 font-black text-[8px] sm:text-[9px] uppercase px-2 sm:px-2.5 py-0.5 text-center tracking-wider">
          {monthName}
        </div>

        {/* Día */}
        <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 text-center leading-tight">
          {dayNumber}
        </div>
      </div>

      {/* Información de fecha y hora local */}
      <div className="text-left flex flex-col justify-center">
        <span className="text-[9px] sm:text-[10px] font-bold capitalize tracking-wider text-slate-400 dark:text-slate-400 block leading-tight">
          {weekdayName}, {year}
        </span>

        <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight block">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default CurrentTimeWidget;