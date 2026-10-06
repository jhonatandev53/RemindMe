import { useState } from "react";

export const CopyButton = ({ task }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation(); // Evitamos que se propague el clic

    const textToCopy = `📌 Tarea: ${task.title}\n${task.date ? `📅 Fecha: ${task.date}\n` : ""}${task.time ? `⏰ Hora: ${task.time}\n` : ""}${task.description ? `📝 Notas: ${task.description}` : ""}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-2 right-2 p-1.5 rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center border shadow-sm ${
        copied
          ? "bg-emerald-500 text-white border-emerald-600 scale-110 opacity-100"
          : "bg-white/60 hover:bg-white text-slate-700 border-white/80 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
      }`}
      title="Copiar tarea al portapapeles"
    >
      {copied ? (
        /* CHULITO VERDE DE ÉXITO */
        <svg
          className="w-4 h-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        /* ICONO DE COPIAR */
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
      )}
    </button>
  );
};