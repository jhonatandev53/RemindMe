export const TaskSkeleton = () => {
  // Generamos un array de 6 elementos para simular una cuadrícula de carga completa
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col gap-4 animate-pulse relative overflow-hidden"
        >
          {/* Barra superior simulando el color de la tarjeta */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200" />

          {/* Cabecera / Título falso */}
          <div className="flex flex-col gap-2.5 mt-2">
            <div className="h-6 bg-slate-200 rounded-xl w-4/5" />
            <div className="h-4 bg-slate-100 rounded-lg w-2/5" />
          </div>

          {/* Insignia de Fecha y Hora falsa */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-6 bg-slate-200 rounded-lg w-28" />
            <div className="h-6 bg-slate-100 rounded-lg w-16" />
          </div>

          {/* Líneas de descripción falsas */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="h-3.5 bg-slate-100 rounded-md w-full" />
            <div className="h-3.5 bg-slate-100 rounded-md w-5/6" />
          </div>

          {/* Pie de tarjeta con botones falsos */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <div className="h-9 bg-slate-100 rounded-xl w-24" />
            <div className="h-9 bg-slate-200 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};