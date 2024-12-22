import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './pages/Perfil';
import CrearEvento from './pages/CrearEvento';
import CrearProyecto from './pages/CrearProyecto';
import CrearAsesor from './pages/CrearAsesor';
import CrearAlumno from './pages/CrearAlumno';
import CrearAlumnoPorEvento from './pages/CrearAlumnoPorEvento';
import CrearAsesorPorEvento from './pages/CrearAsesorPorEvento';
import CrearProyectoPorEvento from './pages/CrearProyectoPorEvento';
import CrearApoyo from './pages/CrearApoyo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Perfil/>} />
        <Route path='/crear_evento' element={<CrearEvento/>} />
        <Route path='/crear_proyecto' element={<CrearProyecto/>} />
        <Route path='/crear_asesor' element={<CrearAsesor/>} />
        <Route path='/crear_alumno' element={<CrearAlumno/>} />
        <Route path='/crear_alumno_por_evento' element={<CrearAlumnoPorEvento/>} />
        <Route path='/crear_asesor_por_evento' element={<CrearAsesorPorEvento/>} />
        <Route path='/crear_proyecto_por_evento' element={<CrearProyectoPorEvento/>} />
        <Route path='/crear_apoyo' element={<CrearApoyo/>} />
      </Routes>
    </Router>
  );
}

export default App;
