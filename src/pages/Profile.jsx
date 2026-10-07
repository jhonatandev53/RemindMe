import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Panel } from '../components/Panel';
import { UserAvatar } from '../components/UserAvatar';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useToast();
  
  // URL oficial de producción en Vercel
  const shareUrl = "https://remindme-red.vercel.app";
  const [copiedLink, setCopiedLink] = useState(false);

  // Telegram Chat ID desde la Base de Datos
  const telegramId = user?.telegramId || "";

  const handleCopyId = () => {
    if (telegramId) {
      navigator.clipboard.writeText(telegramId);
      showToast("¡Chat ID copiado al portapapeles! ");
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast("¡Enlace de invitación copiado! ");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 sm:px-6 py-8 max-w-7xl mx-auto"
    >
      {/* CONTENEDOR GRID DE 3 COLUMNAS EN DESKTOP */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">

        {/* ========================================================= */}
        {/* COLUMNA 1: TARJETA DE PERFIL                              */}
        {/* ========================================================= */}
        <Panel className="p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md relative overflow-hidden w-full max-w-xl mx-auto lg:mx-0">
          
          {/* Banda de acento superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-amber-400 via-[#FFC50C] to-orange-500 z-20" />

          {/* Formas geométricas de fondo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFC50C]/25 dark:bg-[#FFC50C]/15 rounded-3xl rotate-12" />
            <div className="absolute top-1/3 -left-12 w-28 h-48 bg-orange-500/20 dark:bg-orange-500/15 rounded-3xl -rotate-12" />
            <div className="absolute -bottom-14 right-1/4 w-48 h-24 bg-amber-400/25 dark:bg-amber-400/15 rounded-2xl rotate-45" />
          </div>

          <div className="relative z-10">
            {/* Encabezado de perfil */}
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="mb-3">
                <UserAvatar user={user} size="normal" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                {user?.name || 'Mi Perfil'}
              </h2>
              
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFC50C]/20 text-amber-700 dark:text-amber-400 border border-[#FFC50C]/30 flex items-center gap-1.5 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  RemindMe Member
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFC50C]/15 text-amber-600 dark:text-[#FFC50C] border border-[#FFC50C]/30">
                  Cuenta 
                </span>
              </div>
            </div>

            {/* Campos de información */}
            <div className="flex flex-col gap-3.5 mb-8">
              
              {/* Nombre */}
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 transition-all hover:border-[#FFC50C]/60 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FFC50C]/15 dark:bg-[#FFC50C]/20 text-[#FFC50C] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">Nombre completo</span>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 truncate mt-0.5">{user?.name || 'Usuario'}</p>
                </div>
              </div>

              {/* Correo */}
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 transition-all hover:border-[#FFC50C]/60 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FFC50C]/15 dark:bg-[#FFC50C]/20 text-[#FFC50C] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">Correo electrónico</span>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 truncate mt-0.5">{user?.email || 'No disponible'}</p>
                </div>
              </div>

              {/* Telegram Chat ID */}
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-4 transition-all hover:border-[#FFC50C]/60 hover:shadow-sm">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/30 shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.98-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.25z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">Telegram Chat ID</span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5 truncate">
                      {telegramId ? <span className="text-[#FFC50C] font-mono tracking-wider">{telegramId}</span> : <span className="text-amber-500 italic text-xs">No vinculado</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {telegramId && (
                    <button onClick={handleCopyId} title="Copiar Chat ID" className="p-2.5 rounded-xl bg-amber-50 dark:bg-slate-700 text-[#FFC50C] hover:bg-[#FFC50C] hover:text-slate-900 transition-all cursor-pointer shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </button>
                  )}
                  <button onClick={() => navigate('/telegram')} title="Configurar Telegram" className="py-2 px-3 rounded-xl bg-[#FFC50C] hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-sm shadow-[#FFC50C]/30 flex items-center gap-1.5 cursor-pointer">
                    <span>{telegramId ? "Gestionar" : "Vincular"}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Botón Cerrar Sesión */}
            <button onClick={logout} type="button" className="w-full py-3.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-red-600/30 group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </Panel>

        {/* ========================================================= */}
        {/* COLUMNA 2: LÍNEA DIVISORIA AMARILLA (SOLO EN DESKTOP)     */}
        {/* ========================================================= */}
        <div className="hidden lg:flex justify-center items-center h-full py-6">
          <div className="w-1.5 h-480px bg-linear-to-b from-transparent via-[#FFC50C] to-transparent rounded-full shadow-[0_0_20px_rgba(255,197,12,0.6)]" />
        </div>

        {/* ========================================================= */}
        {/* COLUMNA 3: TARJETA DE COMPARTIR REMINDME (QR REAL)        */}
        {/* ========================================================= */}
        <Panel className="p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full w-full max-w-xl mx-auto lg:mx-0">
          
          {/* Banda de acento superior con tono complementario */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-orange-500 via-[#FFC50C] to-amber-400 z-20" />

          {/* Formas geométricas de fondo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#FFC50C]/20 dark:bg-[#FFC50C]/10 rounded-3xl -rotate-12" />
            <div className="absolute bottom-10 -right-10 w-36 h-36 bg-amber-500/15 dark:bg-amber-500/10 rounded-3xl rotate-45" />
          </div>

          <div className="relative z-10 flex flex-col h-full">

            {/* Encabezado */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#FFC50C]/20 text-[#FFC50C] flex items-center justify-center border border-[#FFC50C]/30 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Comparte RemindMe
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Invita a tus amigos y familiares a organizar su día con recordatorios inteligentes. ¡Ayúdanos a crecer! 
              </p>
            </div>

            {/* CÓDIGO QR REAL */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative p-4 bg-white rounded-3xl shadow-lg border-2 border-[#FFC50C]/40 group hover:border-[#FFC50C] transition-all">
                {/* Etiqueta de QR Oficial */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFC50C] text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wider">
                  ¡ESCANEAME! 
                </span>

                {/* Imagen del QR Real generada mediante API pública */}
                <img 
                  src={"/remindme-qr-code.png"} 
                  alt="Código QR RemindMe Oficial" 
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl object-contain group-hover:scale-[1.02] transition-transform"
                />
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                Escanea con la cámara para abrir el sitio oficial
              </span>
            </div>

            {/* ENLACE COPIABLE */}
            <div className="mt-2 space-y-3">
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-2.5 pl-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-2 shadow-inner">
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">Enlace de invitación</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 truncate font-mono">
                    {shareUrl}
                  </p>
                </div>

                <button
                  onClick={handleCopyShareLink}
                  className={`py-2 px-3.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm ${
                    copiedLink 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-[#FFC50C] hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Botones de acción rápida para redes sociales */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent("¡Hola! Te invito a probar RemindMe, una app increíble para organizar recordatorios y tareas diarias: " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("¡Hola! Prueba RemindMe para organizar tus recordatorios:")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.98-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.25z"/>
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>

          </div>
        </Panel>

      </div>
    </motion.div>
  );
};

export default Profile;