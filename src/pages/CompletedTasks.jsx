import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";
import { Panel } from "../components/Panel";
import EmptyCompletedTasks from "../components/EmptyCompletedTasks"; // <--- 1. Importamos el componente limpio
import { motion, AnimatePresence } from "framer-motion";

const CompletedTasks = () => {
  const { tasks } = useContext(TaskContext);

  // Filtrar SOLO las tareas completadas
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="p-6">
      {/* CABECERA USANDO EL COMPONENTE PANEL */}
      <Panel className="p-6 rounded-2xl shadow-sm mb-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          Tareas Completadas
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          Has completado{" "}
          <span className="font-extrabold text-[#FFC50C]">
            {completedTasks.length}
          </span>{" "}
          {completedTasks.length === 1 ? "tarea" : "tareas"}
        </p>
      </Panel>

      {/* LISTADO CON ANIMACIÓN O COMPONENTE VACÍO PROFESIONAL */}
      {completedTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <EmptyCompletedTasks /> {/* <--- 2. Lo renderizamos aquí */}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {completedTasks.map((task) => (
              <motion.div
                key={task._id || task.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  filter: "blur(8px)",
                  transition: { duration: 0.25 },
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;