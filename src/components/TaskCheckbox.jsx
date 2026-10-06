export const TaskCheckbox = ({ completed, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 shadow-sm ${
        completed
          ? "bg-slate-800 border-slate-800 shadow-none"
          : "bg-white/40 border-slate-600/40 hover:bg-white/70 hover:border-slate-700"
      }`}
      title={completed ? "Marcar como pendiente" : "Marcar como completada"}
    >
      <svg
        className={`w-4 h-4 text-white transition-all duration-300 ease-out ${
          completed ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  );
};