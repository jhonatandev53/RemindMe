import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Telegram } from './pages/Telegram';
import { Profile } from './pages/Profile';
import { Tutorial } from "./components/TaskGuide";
import { TelegramGuide } from './components/TelegramGuide';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import CompletedTasks from './pages/CompletedTasks';
import { TaskForm } from './pages/TaskForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/MainLayout';
import { useKeyboardShortcuts } from './components/useKeyboardShortcuts'; // Ajusta la ruta si está en una carpeta 'hooks'

// Componente interno para tener acceso a useNavigate dentro de BrowserRouter
const AppContent = () => {
  const navigate = useNavigate();

  // Activamos los atajos globalmente para las vistas protegidas
  useKeyboardShortcuts({
    onFocusSearch: () => {
      // Si no estás en el dashboard, te lleva allá primero y luego enfoca el buscador
      if (window.location.pathname !== '/dashboard') {
        navigate('/dashboard');
        setTimeout(() => {
          const inputElement = document.querySelector('input[type="text"], input[placeholder*="Buscar"]');
          if (inputElement) inputElement.focus();
        }, 150);
      } else {
        const inputElement = document.querySelector('input[type="text"], input[placeholder*="Buscar"]');
        if (inputElement) inputElement.focus();
      }
    }
  });

  return (
    <Routes>
      {/* Rutas Públicas (Login y Register) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas Protegidas con el Layout global del Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-task" element={<TaskForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/telegram" element={<Telegram />} />
          <Route path="/task-guide" element={<Tutorial />} />
          <Route path="/telegram-guide" element={<TelegramGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;