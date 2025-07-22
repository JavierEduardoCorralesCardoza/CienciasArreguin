// App.js (actualizado)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CrearEvento from './pages/creacion/CrearEvento';
import CrearProyecto from './pages/creacion/CrearProyecto';
import CrearAsesor from './pages/creacion/CrearAsesor';
import CrearAlumno from './pages/creacion/CrearAlumno';
import CrearApoyo from './pages/creacion/CrearApoyo';
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
          
          {/* Rutas solo para asesores */}
          <Route path='/crear_evento' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearEvento/>
            </ProtectedRoute>
          } />
          <Route path='/crear_proyecto' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearProyecto/>
            </ProtectedRoute>
          } />
          <Route path='/crear_asesor' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearAsesor/>
            </ProtectedRoute>
          } />
          <Route path='/crear_alumno' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearAlumno/>
            </ProtectedRoute>
          } />
          <Route path='/crear_apoyo' element={
            <ProtectedRoute requiredRole="asesor">
              <CrearApoyo/>
            </ProtectedRoute>
          } />
          
          {/* Rutas para ambos roles */}
          <Route path='/crear_participacion' element={
            <ProtectedRoute>
              <CrearParticipacion/>
            </ProtectedRoute>
          } />
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