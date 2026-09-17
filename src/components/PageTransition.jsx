import { useEffect, useState } from 'react';

export const PageTransition = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Retraso mínimo para permitir que el DOM se pinte antes de animar
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div 
      className={`w-full min-h-screen transition-opacity duration-700 ease-in-out ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};