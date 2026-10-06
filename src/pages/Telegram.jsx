import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "../components/Panel";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { AuthContext } from "../context/AuthContext";

export const Telegram = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext); // Obtenemos el usuario autenticado
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { showToast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  // Sincronizar el estado local con el telegramId que viene de la Base de Datos
  useEffect(() => {
    if (user && user.telegramId) {
      setTelegramId(user.telegramId);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      showToast("No se encontró una sesión activa", "error");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Petición PUT hacia la ruta protegida /api/users/:id
      const response = await fetch(`${API_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Escudo JWT validado por el authMiddleware
        },
        body: JSON.stringify({ telegramId })
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el Telegram Chat ID");
      }

      const updatedUser = await response.json();

      // Si en tu AuthContext tienes una función para actualizar el usuario en memoria, se actualiza:
      if (updateUser) {
        updateUser(updatedUser);
      }

      showToast("¡Telegram Chat ID guardado en la base de datos! 🚀");
    } catch (error) {
      console.error("Error:", error);
      showToast("No se pudo actualizar el Telegram ID", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 max-w-7xl mx-auto relative min-h-[85vh] flex flex-col justify-center overflow-hidden"
    >
      
      {/* FLOTA DE AVIONCITOS DE PAPEL VOLANDO POR ENCIMA DE LOS BANNERS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        <motion.div
          animate={{ 
            x: ["-10vw", "110vw"], 
            y: ["60vh", "15vh"], 
            rotate: [-25, -20, -28] // Apuntando hacia adelante en su trayectoria ascendente de izquierda a derecha
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          className="absolute text-sky-400/70 dark:text-sky-400/80 drop-shadow-md"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ 
            x: ["110vw", "-10vw"], 
            y: ["10vh", "70vh"], 
            rotate: [155, 160, 150] // Apuntando hacia adelante en su trayectoria descendente de derecha a izquierda
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute text-sky-500/70 dark:text-sky-400/80 drop-shadow-md"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </motion.div>

        <motion.div
          animate={{ 
            x: ["-10vw", "110vw"], 
            y: ["20vh", "80vh"], 
            rotate: [30, 35, 25] // Apuntando hacia adelante en su trayectoria descendente de izquierda a derecha
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute text-sky-400/60 dark:text-sky-500/70 drop-shadow-md"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </motion.div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full">
        
        {/* ENCABEZADO */}
        <Panel className="p-5 sm:p-6 rounded-2xl shadow-sm mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/30 shrink-0">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.98-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.25z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                Notificaciones de Telegram
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                Conecta tu cuenta para recibir recordatorios automáticos de tus tareas desde la base de datos.
              </p>
            </div>
          </div>
        </Panel>

        {/* GUÍA DE PASOS Y FORMULARIO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* INSTRUCCIONES (2 Columnas) */}
          <Panel className="p-5 sm:p-6 rounded-2xl shadow-sm lg:col-span-2 flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-4">
                ¿Cómo funciona la integración?
              </h3>
              
              <ol className="flex flex-col gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FFC50C] text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-sm">1</span>
                  <span>Busca a nuestro bot oficial en Telegram con el usuario <strong className="text-slate-900 dark:text-white font-bold">@RemindMeBot</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FFC50C] text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-sm">2</span>
                  <span>Envía el comando <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-sky-500 font-bold">/start</code> para obtener tu <strong className="text-slate-900 dark:text-white font-bold">Chat ID</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FFC50C] text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-sm">3</span>
                  <span>Copia y pega tu Chat ID para sincronizarlo directamente con tu cuenta en RemindMe!</span>
                </li>
              </ol>
            </div>

            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 flex items-center gap-3">
              <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-semibold text-sky-900 dark:text-sky-200">
                Sincronización Activa: Tu Telegram Chat ID ahora se almacena de forma persistente en tu perfil (No lo compartas).
              </p>
            </div>
          </Panel>

          {/* FORMULARIO DE CONFIGURACIÓN (1 Columna - Centrado Verticalmente) */}
          <Panel className="p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="block text-center text-lg sm:text-xl font-black text-slate-800 dark:text-white mb-3 tracking-wide">
                  TU TELEGRAM CHAT ID
                </label>
                <input
                  type="text"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  placeholder="Ej. 123456789"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-base font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 outline-none transition-all text-center tracking-wider"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-2xl shadow-sm shadow-sky-500/25 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{loading ? "Guardando..." : "Guardar o Actualizar ID"}</span>
              </button>
            </form>
          </Panel>

        </div>

        {/* CONTENEDOR DE BANNER Y GUÍA ORGANIZADOS VERTICALMENTE */}
        <div className="flex flex-col gap-4">
          
          {/* BANNER ESTILIZADO DE GUÍA */}
          <Panel className="p-4 sm:p-5 rounded-2xl shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-500 flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 text-center sm:text-left">
                ¿Quieres saber a detalle cómo automatizar tus alertas?
              </p>
            </div>
            
            <button
              onClick={() => navigate('/telegram-guide')}
              className="w-full sm:w-auto py-2.5 px-5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm shadow-sky-500/25 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>Ver guía completa</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Panel>

          {/* BANNER PARA IR A TELEGRAM (PÁGINA OFICIAL) */}
          <Panel className="p-4 sm:p-5 rounded-2xl shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-500 flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.98-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.25z"/>
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 text-center sm:text-left">
                ¿Ya sabes como funciona nuestro chatbot? ¡ ve e inicialo !
              </p>
            </div>
            
            <button
              onClick={() => window.open("https://telegram.org/", "_blank", "noopener,noreferrer")}
              className="w-full sm:w-auto py-2.5 px-5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm shadow-sky-500/25 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>Ir a Telegram</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Panel>

        </div>

      </div>

    </motion.div>
  );
};

export default Telegram;