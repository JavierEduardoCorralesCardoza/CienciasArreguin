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
            <Link to="/crear_apoyo">Crear Apoyo</Link>
            <br />
            <Link to="/crear_participacion">Crear Participacion</Link>
        </div>
    );
}

export default Perfil;