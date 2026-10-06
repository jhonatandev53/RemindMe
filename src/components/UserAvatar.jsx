import React from 'react';

export const UserAvatar = ({ user, size = "normal" }) => {
  // Generar iniciales para el avatar (Ej. "Jhonatan" -> "JH")
  const getInitials = (name) => {
    if (!name) return "RM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Clases dinámicas según el tamaño que le pasemos
  const sizeClasses = {
    small: "w-10 h-10 text-sm",
    normal: "w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl",
    large: "w-28 h-28 text-4xl"
  };

  const dotSizes = {
    small: "w-3 h-3 bottom-0 right-0 border",
    normal: "w-5 h-5 bottom-1 right-1 border-2",
    large: "w-6 h-6 bottom-1.5 right-1.5 border-2"
  };

  const currentSize = sizeClasses[size] || sizeClasses.normal;
  const currentDot = dotSizes[size] || dotSizes.normal;

  return (
    <div className="relative inline-block group cursor-pointer">
      {/* Efecto de brillo de fondo al hacer hover */}
      <div className="absolute inset-0 bg-[#FFC50C]/30 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Contenedor del Anillo con Gradiente exclusivo de Ámbar, Amarillo y Naranja */}
      <div className={`${currentSize} relative rounded-full bg-linear-to-tr from-amber-500 via-[#FFC50C] to-orange-400 p-1 shadow-lg shadow-amber-500/25 transform transition-transform duration-300 group-hover:scale-105`}>
        <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center font-black tracking-wider border border-slate-800">
          {getInitials(user?.name)}
        </div>
      </div>
      
      {/* Indicador de Activo / En línea con animación suave */}
      <span 
        className={`absolute ${currentDot} bg-emerald-500 border-white dark:border-slate-900 rounded-full shadow-md animate-pulse`} 
        title="Cuenta Activa" 
      />
    </div>
  );
};

export default UserAvatar;