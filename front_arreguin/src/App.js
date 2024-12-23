import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './pages/Perfil';
import CrearEvento from './pages/CrearEvento';
import CrearProyecto from './pages/CrearProyecto';
import CrearAsesor from './pages/CrearAsesor';
import CrearAlumno from './pages/CrearAlumno';
import CrearApoyo from './pages/CrearApoyo';
import CrearParticipacion from './pages/CrearParticipacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Perfil/>} />
        <Route path='/crear_evento' element={<CrearEvento/>} />
        <Route path='/crear_proyecto' element={<CrearProyecto/>} />
        <Route path='/crear_asesor' element={<CrearAsesor/>} />
        <Route path='/crear_alumno' element={<CrearAlumno/>} />
        <Route path='/crear_apoyo' element={<CrearApoyo/>} />
        <Route path='/crear_participacion' element={<CrearParticipacion/>} />
      </Routes>
    </Router>
  );
}

export default App;
