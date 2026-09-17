import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { PageTransition } from '../components/PageTransition'

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico.';
    }
    if (!credentials.password) {
      newErrors.password = 'Por favor ingresa tu contraseña.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true); // Bloqueamos el botón y mostramos el spinner

    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: err.message || 'Credenciales inválidas.' });
      setIsLoading(false); // Desbloqueamos el botón si falla
    }
  };

  return (
    <PageTransition>
    <AuthLayout title="LOGIN">
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        
        {/* Input Email */}
        <div>
          <div className="relative pt-2">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading} // Deshabilitar mientras carga
              className="peer w-full outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm sm:text-base border-b-2 border-gray-200 focus:border-[#FFC50C] focus:shadow-[0_10px_20px_-10px_rgba(255,197,12,0.4)] disabled:opacity-50 py-2 pl-9 transition-all duration-300 relative z-20"
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#FFC50C] peer-focus:-translate-y-120% peer-focus:scale-110 transition-all duration-300 pointer-events-none z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1.5 font-medium pl-1 animate-fade-in">{errors.email}</p>
          )}
        </div>

        {/* Input Password */}
        <div>
          <div className="relative pt-2">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
              disabled={isLoading}
              className="peer w-full outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm sm:text-base border-b-2 border-gray-200 focus:border-[#FFC50C] focus:shadow-[0_10px_20px_-10px_rgba(255,197,12,0.4)] disabled:opacity-50 py-2 pl-9 transition-all duration-300 relative z-20"
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#FFC50C] peer-focus:-translate-y-120% peer-focus:scale-110 transition-all duration-300 pointer-events-none z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1.5 font-medium pl-1 animate-fade-in">{errors.password}</p>
          )}
        </div>

        {/* Error General */}
        {errors.general && (
          <p className="text-red-500 text-xs sm:text-sm font-medium text-center animate-fade-in bg-red-50 py-2 rounded-md border border-red-100">{errors.general}</p>
        )}

        {/* Botón Login Dinámico */}
        <button
          type="submit"
          disabled={isLoading} // El botón se apaga si está cargando
          className={`w-full py-3.5 text-white font-extrabold rounded-full flex justify-center items-center gap-2 transition-all duration-300 mt-6 tracking-widest uppercase text-sm sm:text-base ${
            isLoading 
              ? 'bg-[#FFC50C]/60 cursor-not-allowed' // Estado de carga (opaco)
              : 'bg-[#FFC50C] hover:bg-[#e6b000] shadow-md hover:shadow-[0_10px_20px_-10px_rgba(255,197,12,0.8)] transform hover:-translate-y-1 active:scale-95 cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              {/* Spinner SVG animado de Tailwind */}
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              INICIANDO...
            </>
          ) : (
            'LOGIN'
          )}
        </button>
      </form>
    </AuthLayout>
    </PageTransition>
  );
};