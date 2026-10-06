import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Si la app está cargando y revisando el localStorage, mostramos un spinner
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC50C]"></div>
      </div>
    );
  }

  // Si no hay usuario, lo mandamos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está OK, lo dejamos pasar al Dashboard y sus rutas hijas
  return <Outlet />;
};