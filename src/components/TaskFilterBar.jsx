import { Panel } from './Panel'; // Ajusta la ruta según donde lo guardes

export const TaskFilterBar = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  const handleDateClick = () => {
    onSortChange(sortBy === 'newest' ? 'oldest' : 'newest');
  };

  const handleAlphaClick = () => {
    onSortChange(sortBy === 'az' ? 'za' : 'az');
  };

  const isDateActive = sortBy === 'newest' || sortBy === 'oldest';
  const isAlphaActive = sortBy === 'az' || sortBy === 'za';

  return (
    <Panel className="p-5 rounded-3xl shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* BUSCADOR */}
      <div className="relative w-full md:w-[420px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
          <svg className="w-5 h-5 text-[#FFC50C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tarea por título o descripción..."
          className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-[#FFC50C] dark:focus:border-[#FFC50C] focus:ring-4 focus:ring-[#FFC50C]/15 outline-none transition-all shadow-xs"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition-colors"
            title="Limpiar búsqueda"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* TOGGLES / BOTONES DE ORDENAMIENTO */}
      <div className="flex items-center gap-2.5 w-full md:w-auto">
        <button
          onClick={handleDateClick}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border-2 shadow-xs ${
            isDateActive
              ? 'bg-[#FFC50C] text-slate-900 border-[#FFC50C] shadow-md shadow-[#FFC50C]/25 scale-[1.02]'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{sortBy === 'oldest' ? 'Más antiguas' : 'Más nuevas'}</span>
          <svg className={`w-3.5 h-3.5 shrink-0 transition-transform ${sortBy === 'oldest' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button
          onClick={handleAlphaClick}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border-2 shadow-xs ${
            isAlphaActive
              ? 'bg-[#FFC50C] text-slate-900 border-[#FFC50C] shadow-md shadow-[#FFC50C]/25 scale-[1.02]'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span>{sortBy === 'za' ? 'Z - A' : 'A - Z'}</span>
          <svg className={`w-3.5 h-3.5 shrink-0 transition-transform ${sortBy === 'za' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

    </Panel>
  );
};