import { createContext, useContext, useState, useRef, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Referencia para el control anti-spam (cooldown de 600ms entre llamadas)
  const lastCallRef = useRef(0);
  const timeoutRef = useRef(null);
  const exitTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    const now = Date.now();
    
    // 🔒 PROTECCIÓN ANTI-SPAM: Si intentan spamear en menos de 600ms, se ignora
    if (now - lastCallRef.current < 600) {
      return;
    }
    lastCallRef.current = now;

    // Limpiar timeouts anteriores si existían
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

    // Mostrar el toast y activar animación de entrada
    setToast({ message, type });
    setIsAnimating(false); // Reset para forzar el trigger de entrada
    
    // Pequeño delay para asegurar que el navegador detecte el cambio de estado y ejecute la animación
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    // Tiempo visible antes de iniciar la salida (3 segundos)
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false); // Inicia animación de salida

      // Esperar a que termine la animación visual (300ms) antes de desmontar del DOM
      exitTimeoutRef.current = setTimeout(() => {
        setToast(null);
      }, 300);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* CONTENEDOR FLOTANTE DEL TOAST RESPONSIVE */}
      {toast && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-50 pointer-events-none flex items-center justify-center sm:justify-end">
          <div
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-xl font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 ease-out transform max-w-sm w-full sm:w-auto ${
              isAnimating
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            } ${
              toast.type === "success"
                ? "bg-[#FFC50C] text-slate-900 border-2 border-amber-300 shadow-[0_10px_30px_rgba(255,197,12,0.4)]" // Amarillo RemindMe
                : "bg-red-500 text-white border-2 border-red-400 shadow-[0_10px_30px_rgba(239,68,68,0.4)]"    // Estilo de error por defecto
            }`}
          >
            {/* ICONO */}
            {toast.type === "success" ? (
              <svg className="w-5 h-5 text-slate-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}

            <span className="leading-tight">{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};