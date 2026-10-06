export const Panel = ({ children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors ${className}`}>
      {children}
    </div>
  );
};

// Exportación por defecto para evitar cualquier conflicto de importación
export default Panel;