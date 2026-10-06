import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { ThemeContext } from '../context/ThemeContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  // Estado para controlar si el sidebar está abierto o cerrado en móviles
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'completed',
      label: 'Completadas',
      path: '/completed',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'telegram',
      label: 'Telegram',
      path: '/telegram',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Perfil',
      path: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  // Función para navegar y cerrar automáticamente el sidebar en móviles
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <>
      {/* BOTÓN HAMBURGUESA MÓVIL (Solo visible en pantallas pequeñas) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5 left-5 z-40 p-2.5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* OVERLAY / FONDO OSCURO EN MÓVIL */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR PRINCIPAL */}
      <aside 
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-[#FFC50C] min-h-screen flex flex-col justify-between py-6 select-none shrink-0 shadow-2xl md:shadow-xl rounded-tr-[36px] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } overflow-hidden`}
      >
        
        {/* BOTÓN CERRAR (X) MÓVIL */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-5 z-30 p-2 text-slate-900/60 hover:text-slate-900 bg-white/20 rounded-full backdrop-blur-sm cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* CAPA DE FIGURAS GEOMÉTRICAS DE FONDO */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-16 -right-12 w-60 h-60 bg-white/15 rounded-3xl rotate-45 transform" />
          <div className="absolute top-1/4 -left-16 w-72 h-44 bg-white/10 rounded-3xl -rotate-12 transform" />
          <div className="absolute top-2/4 -right-10 w-48 h-48 bg-amber-300/30 rounded-3xl rotate-12 transform" />
          <div className="absolute -bottom-12 -left-10 w-56 h-56 bg-white/15 rounded-3xl rotate-45 transform" />
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          
          {/* BRANDING / LOGO */}
          <div 
            className="flex items-center gap-3 px-6 mb-2 cursor-pointer mt-2 md:mt-0" 
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="bg-white/25 p-2.5 rounded-2xl backdrop-blur-md shadow-sm border border-white/40 flex items-center justify-center">
              <svg className="w-7 h-7 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                Remind<span className="text-slate-900">Me!</span>
              </h1>
            </div>
          </div>

          {/* BOTÓN CTA: NUEVA TAREA */}
          <div className="px-4">
            <button 
              onClick={() => handleNavigation('/new-task')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm shadow-[0_8px_15px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_-3px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-300">
                <svg className="w-4 h-4 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span>Nueva Tarea</span>
            </button>
          </div>

          {/* MENÚ DE NAVEGACIÓN */}
          <nav className="flex flex-col gap-2.5 pr-0 mt-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative flex items-center gap-3.5 py-3.5 px-6 font-bold text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-l-3xl ml-4 mr-0 shadow-none ' +
                        'before:content-[""] before:absolute before:-top-5 before:right-0 before:w-5 before:h-5 before:bg-transparent before:rounded-br-2xl before:shadow-[5px_5px_0_0_#f1f5f9] dark:before:shadow-[5px_5px_0_0_#0f172a] before:pointer-events-none ' +
                        'after:content-[""] after:absolute after:-bottom-5 after:right-0 after:w-5 after:h-5 after:bg-transparent after:rounded-tr-2xl after:shadow-[5px_-5px_0_0_#f1f5f9] dark:after:shadow-[5px_-5px_0_0_#0f172a] after:pointer-events-none'
                      : 'text-slate-900/80 hover:text-slate-900 hover:bg-black/5 rounded-2xl mx-4'
                  }`}
                >
                  <span className={isActive ? 'text-[#FFC50C]' : 'text-slate-900/70'}>
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTENEDOR INFERIOR: TEMA, ACERCA DE, FAQ Y CERRAR SESIÓN */}
        <div className="px-4 mt-auto relative z-10 flex flex-col gap-3">
          
          {/* BOTÓN CAMBIO DE TEMA (TOGGLE) */}
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between py-3 px-4 rounded-2xl text-slate-900/90 hover:text-slate-900 hover:bg-black/5 font-bold text-sm transition-all duration-200 cursor-pointer backdrop-blur-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-slate-900">
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
              <span>{darkMode ? "Modo Claro" : "Modo Oscuro"}</span>
            </div>

            <div className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-slate-900 justify-end' : 'bg-black/20 justify-start'}`}>
              <div className="bg-white w-3.5 h-3.5 rounded-full shadow-sm transition-transform" />
            </div>
          </button>

          {/* CONTENEDOR LADO A LADO: ACERCA DE (IZQUIERDA) Y FAQ (DERECHA) - SOLO ICONOS */}
          <div className="flex items-center gap-2">
            
            {/* BOTÓN ACERCA DE (CEREBRO - IZQUIERDA) */}
            <button 
              onClick={() => handleNavigation('/about')}
              title="Acerca de"
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-2xl transition-all duration-200 cursor-pointer backdrop-blur-xs ${
                location.pathname === '/about'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-900/80 hover:text-slate-900 hover:bg-black/5 bg-black/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 3A5.5 5.5 0 004 8.5c0 1.05.295 2.03.807 2.87C3.712 12.02 3 13.18 3 14.5a4.5 4.5 0 004.5 4.5c.34 0 .67-.04.99-.11A6.502 6.502 0 0012 21a6.502 6.502 0 003.51-2.11c.32.07.65.11.99.11a4.5 4.5 0 004.5-4.5c0-1.32-.712-2.48-1.807-3.13A5.485 5.485 0 0020 8.5 5.5 5.5 0 0014.5 3c-1.33 0-2.55.48-3.5 1.28A5.488 5.488 0 009.5 3z" />
              </svg>
            </button>

            {/* BOTÓN PREGUNTAS FRECUENTES / FAQ (AYUDA - DERECHA) */}
            <button 
              onClick={() => handleNavigation('/faq')}
              title="Preguntas Frecuentes"
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-2xl transition-all duration-200 cursor-pointer backdrop-blur-xs ${
                location.pathname === '/faq'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-900/80 hover:text-slate-900 hover:bg-black/5 bg-black/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

          </div>

          {/* CERRAR SESIÓN */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl text-slate-900/80 hover:text-white hover:bg-red-500/80 font-bold text-sm transition-all duration-200 cursor-pointer group backdrop-blur-xs"
          >
            <svg className="w-5 h-5 text-slate-900/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Cerrar Sesión</span>
          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;