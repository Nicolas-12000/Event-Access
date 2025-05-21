import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import EventList from './components/events/EventList';
import EventDetail from './components/Events/EventDetail';
import QRScanner from './components/QR/QRScanner';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redireccionar al login si no hay token
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aquí podrías verificar si el token es válido con un endpoint
    // o simplemente verificar si existe
    const checkAuth = async () => {
      // Simulación de carga
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/scan/:qrId" element={<QRScanner />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <EventList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/event/:eventId" 
          element={
            <ProtectedRoute>
              <EventDetail />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta para manejar rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;