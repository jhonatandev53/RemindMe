import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = ({ onFocusSearch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Evitar que los atajos seactiven si el usuario está escribiendo en un input, textarea o select
      const activeElement = document.activeElement;
      const isWriting = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.isContentEditable
      );

      if (isWriting) return;

      // Ignorar si se combinan con Ctrl, Alt o Meta (Command en Mac)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key.toLowerCase();

      switch (key) {
        case 'd': // Ir al Dashboard
          e.preventDefault();
          navigate('/dashboard');
          break;
        case 'c': // Ir a Tareas Completadas
          e.preventDefault();
          navigate('/completed');
          break;
        case 't': // Ir a Telegram
          e.preventDefault();
          navigate('/telegram');
          break;
        case 'p': // Ir al Perfil
          e.preventDefault();
          navigate('/profile');
          break;
        case 'n': // 🆕 Ir a Nueva Tarea
          e.preventDefault();
          navigate('/new-task');
          break;
        case 's': // 🔍 Enfocar la barra de búsqueda
          e.preventDefault();
          if (onFocusSearch) {
            onFocusSearch();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, onFocusSearch]);
};