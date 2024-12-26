import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './pages/Perfil';
import CrearEvento from './pages/creacion/CrearEvento';
import CrearProyecto from './pages/creacion/CrearProyecto';
import CrearAsesor from './pages/creacion/CrearAsesor';
import CrearAlumno from './pages/creacion/CrearAlumno';
import CrearApoyo from './pages/creacion/CrearApoyo';
import CrearParticipacion from './pages/creacion/CrearParticipacion';
import TablaGeneral from './components/TablaGeneral';


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
        <Route path='/visualizar/:entidad' element={<TablaGeneral/>} />
      </Routes>
    </Router>
  );
}

export default App;
