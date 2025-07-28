import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CrearGeneral from './pages/creacion/CrearGeneral';
import CrearParticipacion from './pages/creacion/CrearParticipacion';
import TablaGeneral from './components/TablaGeneral';
import PerfilGeneral from './pages/perfiles/PerfilGeneral';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          
          {/* Rutas protegidas - requieren login */}
          <Route path="/" element={
            <ProtectedRoute>
              <Perfil/>
            </ProtectedRoute>
          } />
          
          {/* Ruta genérica para crear cualquier entidad (excepto participación) */}
          {/* Solo para asesores */}
          <Route path='/crear/:entidad' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearGeneral/>
            </ProtectedRoute>
          } />
          
          {/* Ruta específica para participación - para ambos roles */}
          <Route path='/crear/participacion' element={
            <ProtectedRoute>
              <CrearParticipacion/>
            </ProtectedRoute>
          } />
          
          {/* Rutas para visualización - ambos roles */}
          <Route path='/visualizar/:entidad' element={
            <ProtectedRoute>
              <TablaGeneral/>
            </ProtectedRoute>
          } />
          <Route path='/perfil/:entidad/:id' element={
            <ProtectedRoute>
              <PerfilGeneral/>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;