import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans transition-colors">
      
      {/* Sidebar fijo a la izquierda */}
      <div className="h-screen sticky top-0 shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Área principal con padding superior en mobile (pt-16) para el botón hamburguesa */}
      <main className="flex-1 h-screen overflow-y-auto pt-16 md:pt-0">
        <Outlet />
      </main>

    </div>
  );
};