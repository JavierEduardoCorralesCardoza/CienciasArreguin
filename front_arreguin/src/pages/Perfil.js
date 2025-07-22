// pages/Perfil.js (actualizado)
import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TablaPrincipal from "../components/TablaPrincipal";

function Perfil() {
    const { currentUser, isAsesor, isAlumno, logout } = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <span>Bienvenido, {currentUser.nombre} ({currentUser.tipo})</span>
                <button 
                    onClick={logout} 
                    style={{ marginLeft: '10px', padding: '5px 10px' }}
                >
                    Cerrar Sesión
                </button>
            </div>

            <h2>Panel de Control</h2>
            
            {/* Enlaces que solo pueden ver los asesores */}
            {isAsesor && (
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '20px' }}>
                    <h3>Funciones de Asesor</h3>
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
                    <Link to="/visualizar/asesores">Ver Asesores</Link>
                    <br />
                    <Link to="/visualizar/apoyos">Ver Apoyos</Link>
                    <br />
                </div>
            )}

            {/* Enlaces que pueden ver ambos roles */}
            <div style={{ backgroundColor: '#e9ecef', padding: '15px', marginBottom: '20px' }}>
                <h3>Funciones Generales</h3>
                <Link to="/crear_participacion">Crear Participación</Link>
                <br />
                <Link to="/visualizar/alumnos">Ver Alumnos</Link>
                <br />
                <Link to="/visualizar/eventos">Ver Eventos</Link>
                <br />
                <Link to="/visualizar/proyectos">Ver Proyectos</Link>
                <br />
            </div>

            {/* Funciones específicas para alumnos */}
            {isAlumno && (
                <div style={{ backgroundColor: '#d4edda', padding: '15px', marginBottom: '20px' }}>
                    <h3>Mis Actividades</h3>
                    <Link to={`/mis-proyectos/${currentUser.id}`}>Mis Proyectos</Link>
                    <br />
                    <Link to={`/mis-participaciones/${currentUser.id}`}>Mis Participaciones</Link>
                    <br />
                </div>
            )}
            
            <TablaPrincipal />
        </div>
    );
}

export default Perfil;