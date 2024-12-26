import React from "react";
import { Link } from 'react-router-dom';
import TablaPrincipal from "../components/TablaPrincipal";

function Perfil() {
    return (
        <div>
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
            <br />
            <Link to="/visualizar/alumnos">Ver Alumnos</Link>
            <br />
            <Link to="/visualizar/asesores">Ver Asesores</Link>
            <br />
            <Link to="/visualizar/eventos">Ver Eventos</Link>
            <br />
            <Link to="/visualizar/proyectos">Ver Proyectos</Link>
            <br />
            <Link to="/visualizar/apoyos">Ver Apoyos</Link>
            <br />
            <TablaPrincipal />
        </div>
    );
}

export default Perfil;