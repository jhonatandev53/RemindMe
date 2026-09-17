import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '25px', maxWidth: '450px', margin: '40px auto', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h2 style={{ textAlign: 'center', marginTop: '0', color: '#007bff' }}>Mi Perfil</h2>
      
      <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <span style={{ color: '#aaa', fontSize: '14px' }}>Nombre completo</span>
          <p style={{ margin: '4px 0 0', fontWeight: 'bold', fontSize: '18px' }}>{user?.name || 'Usuario'}</p>
        </div>

        <div>
          <span style={{ color: '#aaa', fontSize: '14px' }}>Correo electrónico</span>
          <p style={{ margin: '4px 0 0', fontWeight: 'bold', fontSize: '16px' }}>{user?.email || 'No disponible'}</p>
        </div>

        <div>
          <span style={{ color: '#aaa', fontSize: '14px' }}>Estado de cuenta</span>
          <p style={{ margin: '4px 0 0', color: '#28a745', fontWeight: 'bold' }}>● Activa (Sesión Simulada)</p>
        </div>
      </div>

      <button 
        onClick={logout} 
        style={{ width: '100%', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};