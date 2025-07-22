// pages/Perfil.js (actualizado)
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TablaPrincipal from "../components/TablaPrincipal";

function Perfil() {
    const { 
        currentUser, 
        isAsesor, 
        isAlumno, 
        isAdminUser,
        userRole,
        logout, 
        isAdmin,
        requireAdmin 
    } = useAuth();
    
    const [adminStatus, setAdminStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verificar status de admin al cargar el componente
    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                if (isAsesor) {
                    const adminResult = await isAdmin();
                    setAdminStatus(adminResult);
                }
            } catch (error) {
                console.error('Error verificando status admin:', error);
                setAdminStatus(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [isAsesor, isAdmin]);

    // Función para manejar acciones que requieren permisos de admin
    const handleAdminAction = async (action) => {
        try {
            await requireAdmin();
            // Si llegamos aquí, el usuario tiene permisos de admin
            action();
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <span>
                    Bienvenido, {currentUser.nombre} ({currentUser.tipo}
                    {userRole && ` - ${userRole}`})
                    {isAdminUser && <span>[ADMIN]</span>}
                </span>
                <button 
                    onClick={logout} 
                    style={{ marginLeft: '10px', padding: '5px 10px' }}
                >
                    Cerrar Sesión
                </button>
            </div>

            <h2>Panel de Control</h2>
            
            {/* Sección específica para administradores */}
            {(isAdminUser || adminStatus) && (
                <div>
                    <h3>Panel de Administrador</h3>
                    <Link to="/crear_asesor">Crear Asesor</Link>
                    <br />
                    <Link to="/crear_alumno">Crear Alumno</Link>
                    <br />
                    <Link to="/visualizar/asesores">Ver Asesores</Link>
                    <br />
                    <Link to="/crear_apoyo">Crear Apoyo</Link>
                    <br />
                    <Link to="/visualizar/apoyos">Ver Apoyos</Link>
                    <br />
                </div>
            )}

            {/* Sección para asesores (no admin) */}
            {isAsesor && (
                <div>
                    <h3>Panel de Asesor</h3>
                    <Link to="/crear_evento">Crear Evento</Link>
                    <br />
                    <Link to="/crear_proyecto">Crear Proyecto</Link>
                    <br />
                </div>
            )}

            {/* Sección común para todos los usuarios */}
            <div>
                <h3>Acciones Generales</h3>
                <Link to="/crear_participacion">Crear Participación</Link>
                <br />
                <Link to="/visualizar/alumnos">Ver Alumnos</Link>
                <br />
                <Link to="/visualizar/eventos">Ver Eventos</Link>
                <br />
                <Link to="/visualizar/proyectos">Ver Proyectos</Link>
                <br />
            </div>

            {/* Sección específica para alumnos */}
            {isAlumno && (
                <div style={{ backgroundColor: '#d4edda', padding: '15px', marginBottom: '20px' }}>
                    <h3>Mis Actividades</h3>
                    <Link to={`/mis-proyectos/${currentUser.id}`}>Mis Proyectos</Link>
                    <br />
                    <Link to={`/mis-participaciones/${currentUser.id}`}>Mis Participaciones</Link>
                    <br />
                </div>
            )}

            {/* Información de debugging (solo en desarrollo) */}
            {process.env.NODE_ENV === 'development' && (
                <div>
                    <strong>Debug Info:</strong><br/>
                    Tipo: {currentUser.tipo} | 
                    Rol: {userRole || 'N/A'} | 
                    Admin (local): {isAdminUser ? 'Sí' : 'No'} | 
                    Admin (server): {adminStatus ? 'Sí' : 'No'}
                </div>
            )}
            
            <TablaPrincipal />
        </div>
    );
}

export default Perfil;