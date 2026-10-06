import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { TaskCard } from "../components/TaskCard";
import { TaskSkeleton } from "../components/TaskSkeleton";
import { TaskFilterBar } from "../components/TaskFilterBar";
import { NoSearchResults } from "../components/NoSearchResults";
import { EmptyDashboardTasks } from "../components/EmptyDashboardTasks";
import { Panel } from "../components/Panel";
import { UserAvatar } from "../components/UserAvatar";
import { WelcomeGreeting } from "../components/WelcomeGreeting";
import { CurrentTimeWidget } from "../components/CurrentTimeWidget"; // <--- Nuestro widget de fecha y hora
import { motion, AnimatePresence } from "framer-motion";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, loading } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const pendingTasks = tasks.filter((task) => !task.completed);

  const filteredAndSortedTasks = pendingTasks
    .filter((task) => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt || 0);
      const dateB = new Date(b.date || b.createdAt || 0);

      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="p-6 pt-6 md:pt-6">
      
      {/* BANNER SUPERIOR RESPONSIVO */}
      <Panel className="p-4 sm:p-6 rounded-2xl shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6">
        
        {/* =================================================== */}
        {/* VISTA MÓVIL (Visible solo en pantallas pequeñas < lg) */}
        {/* =================================================== */}
        <div className="flex flex-col gap-4 lg:hidden w-full">
          {/* Fila superior móvil: Título y Avatar */}
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">Panel de Tareas</h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                Tienes{" "}
                <span className="font-extrabold text-[#FFC50C]">
                  {loading ? "..." : pendingTasks.length}
                </span>{" "}
                {pendingTasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}
              </p>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="group relative flex items-center p-2 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-xs shrink-0 cursor-pointer"
              title="Ir a mi perfil"
            >
              <UserAvatar user={user} size="small" />
            </button>
          </div>

          {/* Fila inferior móvil: Reloj Calendario centrado y ordenado */}
          <div className="flex justify-center w-full pt-1">
            <CurrentTimeWidget />
          </div>
        </div>

        {/* =================================================== */}
        {/* VISTA ESCRITORIO (Visible solo en lg o superior)     */}
        {/* =================================================== */}
        
        {/* 1. IZQUIERDA: Título y contador (Escritorio) */}
        <div className="hidden lg:block">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Panel de Tareas</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Tienes{" "}
            <span className="font-extrabold text-[#FFC50C]">
              {loading ? "..." : pendingTasks.length}
            </span>{" "}
            {pendingTasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}
          </p>
        </div>

        {/* 2. CENTRO: Mensaje de bienvenida flotante */}
        <div className="w-full lg:w-auto flex justify-center">
          <WelcomeGreeting />
        </div>

        {/* 3. DERECHA: Reloj local y Botón de perfil completo (Escritorio) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <CurrentTimeWidget />
          
          <button
            onClick={() => navigate('/profile')}
            className="group relative flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200 cursor-pointer shadow-xs shrink-0"
            title="Ir a mi perfil"
          >
            <UserAvatar user={user} size="small" />
            
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                Mi Cuenta
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition-colors">
                {user?.name || 'Perfil'}
              </span>
            </div>

            <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Panel>

      <TaskFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center gap-3 shadow-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FFC50C] flex items-center justify-center shadow-md animate-spin">
              <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-200 tracking-wide animate-pulse">
              Estamos cargando tus tareas, un momento por favor... 
            </p>
          </motion.div>

          <TaskSkeleton />
        </div>
      ) : tasks.length === 0 || (pendingTasks.length === 0 && !searchTerm) ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <EmptyDashboardTasks />
        </motion.div>
      ) : filteredAndSortedTasks.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <NoSearchResults 
            searchTerm={searchTerm} 
            onClear={() => setSearchTerm("")} 
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTasks.map((task) => (
              <motion.div
                key={task._id || task.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  filter: "blur(8px)",
                  transition: { duration: 0.25 } 
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <TaskCard task={task} searchTerm={searchTerm} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dashboard;