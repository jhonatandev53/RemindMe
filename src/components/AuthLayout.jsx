import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const AuthLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [greeting, setGreeting] = useState('');

  // Lógica para calcular el saludo según la hora del día
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('¡Buenos días! ☀️');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('¡Buenas tardes! 🌤️');
    } else {
      setGreeting('¡Buenas noches! 🌙');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return; 
    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="min-h-screen w-full bg-slate-950 relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Fondo base con malla */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#FFC50C 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Luces ambientales profundas */}
      <div className="absolute top-[-20%] left-[-10%] w-600px h-600px bg-[#FFC50C]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-600px h-600px bg-[#FFC50C]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* --- SISTEMA PARALLAX: AGENDAS FLOTANTES --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-10 -left-10 md:top-[8%] md:left-[6%] w-28 h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-r-2xl rounded-l-sm transition-transform duration-500 ease-out flex scale-50 md:scale-100 opacity-30 md:opacity-100 shadow-2xl"
          style={{ transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 2.5}px) rotate(-15deg)` }}
        >
          <div className="w-4 h-full border-r border-white/10 flex flex-col justify-evenly items-center py-2 bg-black/20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2 opacity-50">
            <div className="w-3/4 h-1 bg-white/20 rounded-full" />
            <div className="w-full h-1 bg-white/10 rounded-full" />
            <div className="w-5/6 h-1 bg-white/10 rounded-full" />
          </div>
        </div>

        <div 
          className="hidden md:flex absolute bottom-[12%] right-[8%] w-40 h-56 bg-white/5 backdrop-blur-md border border-white/10 rounded-r-3xl rounded-l-md transition-transform duration-500 ease-out shadow-2xl"
          style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px) rotate(12deg)` }}
        >
          <div className="w-6 h-full bg-[#FFC50C]/20 border-r border-white/10 rounded-l-md" />
          <div className="absolute top-0 right-8 w-4 h-20 bg-[#FFC50C]/70 rounded-b-sm shadow-md" />
        </div>

        <div 
          className="hidden md:block absolute bottom-[8%] left-[20%] w-32 h-44 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-transform duration-500 ease-out shadow-xl"
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px) rotate(-25deg)` }}
        >
          <div className="absolute right-4 top-0 bottom-0 w-2 bg-black/20 border-x border-white/5" />
          <div className="absolute top-6 left-6 w-10 h-6 bg-[#FFC50C]/30 rounded-sm border border-[#FFC50C]/50" />
        </div>

        <div 
          className="absolute -top-10 -right-10 md:top-[15%] md:right-[22%] w-36 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-b-xl rounded-t-sm transition-transform duration-500 ease-out flex flex-col scale-50 md:scale-100 opacity-30 md:opacity-100 shadow-lg"
          style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px) rotate(8deg)` }}
        >
          <div className="w-full h-4 bg-black/30 border-b border-white/10 rounded-t-sm" />
          <div className="flex-1 border-b-[3px] border-r-[3px] border-white/5 rounded-br-xl" />
        </div>
      </div>

      {/* --- TARJETA PRINCIPAL --- */}
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-520px relative z-10 transition-transform duration-200 ease-out"
        style={{
          transform: isMobile ? 'none' : `perspective(1200px) rotateX(${mousePos.y / 3}deg) rotateY(${mousePos.x / -3}deg)`,
          boxShadow: isMobile 
            ? '0 20px 60px -15px rgba(255,197,12,0.3)' 
            : `${mousePos.x * -1}px ${mousePos.y * -1}px 40px rgba(0,0,0,0.6), 0 20px 60px -15px rgba(255,197,12,0.3)`
        }}
      >
        
        {/* Panel Izquierdo con BRANDING */}
        <div className="w-full md:w-5/12 bg-[#FFC50C] relative flex flex-col justify-between p-8 md:p-12 overflow-hidden min-h-240px md:min-h-auto">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rotate-45 pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-black/5 -rotate-12 pointer-events-none" />
          <div className="absolute top-1/3 -right-10 w-48 h-48 bg-white/20 rotate-12 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-white/30 inline-flex">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-md">
              Remind<br className="hidden md:block" /> Me!
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-240px leading-relaxed drop-shadow-sm">
              Conquista tu día, organiza tus tareas y potencia tu productividad.
            </p>
          </div>

          <div className="relative z-10 flex flex-row md:flex-col gap-3 w-full md:w-auto justify-center md:justify-end items-center md:items-end mt-8 md:mt-0">
            <button
              onClick={() => navigate('/login')}
              className={`px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 w-1/2 md:w-48 text-center cursor-pointer ${
                isLogin
                  ? 'bg-white text-[#FFC50C] shadow-xl rounded-full md:rounded-l-full md:rounded-r-none translate-x-0 md:translate-x-12 scale-100'
                  : 'text-white/90 hover:text-white bg-black/10 md:bg-transparent rounded-full hover:scale-105'
              }`}
            >
              LOGIN
            </button>

            <button
              onClick={() => navigate('/register')}
              className={`px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 w-1/2 md:w-48 text-center cursor-pointer ${
                !isLogin
                  ? 'bg-white text-[#FFC50C] shadow-xl rounded-full md:rounded-l-full md:rounded-r-none translate-x-0 md:translate-x-12 scale-100'
                  : 'text-white/90 hover:text-white bg-black/10 md:bg-transparent rounded-full hover:scale-105'
              }`}
            >
              REGISTRARSE
            </button>
          </div>
        </div>

        {/* Panel Derecho - Formulario con Saludo Dinámico */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white z-10">
          
          {/* Saludo dinámico según la hora */}
          <div className="mb-2 text-center md:text-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 inline-block">
              {greeting}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#FFC50C] tracking-wide mb-6 text-center md:text-left">
            {title}
          </h2>

          {children}
        </div>

      </div>
    </div>
  );
};