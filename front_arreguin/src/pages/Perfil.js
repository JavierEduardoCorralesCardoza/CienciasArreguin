import React from "react";
import { Link } from 'react-router-dom';

function Perfil() {
    return (
        <div>
            <h1>Perfil</h1>
            <Link to="/crear_evento">Crear Evento</Link>
            <br />
            <Link to="/crear_proyecto">Crear Proyecto</Link>
            <br />
            <Link to="/crear_asesor">Crear Asesor</Link>
            <br />
            <Link to="/crear_alumno">Crear Alumno</Link>
            <br />
            <Link to="/crear_alumno_por_evento">Crear Alumno Por Evento</Link>
            <br />
            <Link to="/crear_asesor_por_evento">Crear Asesor Por Evento</Link>
            <br />
            <Link to="/crear_proyecto_por_evento">Crear Proyecto Por Evento</Link>
            <br />
            <Link to="/crear_apoyo">Crear Apoyo</Link>
        </div>
    );
}

export default Perfil;