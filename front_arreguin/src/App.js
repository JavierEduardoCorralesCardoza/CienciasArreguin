import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './pages/Perfil';
import CrearEvento from './pages/CrearEvento';
import CrearProyecto from './pages/CrearProyecto';
import CrearAsesor from './pages/CrearAsesor';
import CrearAlumno from './pages/CrearAlumno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Perfil/>} />
        <Route path='/crear_evento' element={<CrearEvento/>} />
        <Route path='/crear_proyecto' element={<CrearProyecto/>} />
        <Route path='/crear_asesor' element={<CrearAsesor/>} />
        <Route path='/crear_alumno' element={<CrearAlumno/>} />
      </Routes>
    </Router>
  );
}

export default App;
