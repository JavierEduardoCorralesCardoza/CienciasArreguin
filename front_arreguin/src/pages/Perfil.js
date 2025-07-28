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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-lg text-gray-600">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con información del usuario */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                Bienvenido, <span className="font-medium">{currentUser.nombre}</span> 
                                <span className="text-gray-500">({currentUser.tipo}
                                {userRole && ` - ${userRole}`})</span>
                                {isAdminUser && <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">[ADMIN]</span>}
                            </span>
                            <button 
                                onClick={logout} 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Sección específica para administradores */}
                    {(isAdminUser || adminStatus) && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Panel de Administrador
                            </h3>
                            <div className="space-y-3">
                                <Link 
                                    to="/crear/asesor" 
                                    className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Asesor
                                </Link>
                                <Link 
                                    to="/crear/alumno" 
                                    className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Alumno
                                </Link>
                                <Link 
                                    to="/crear/apoyo" 
                                    className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Apoyo
                                </Link>
                                <Link 
                                    to="/visualizar/asesores" 
                                    className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Ver Asesores
                                </Link>
                                <Link 
                                    to="/visualizar/apoyos" 
                                    className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Ver Apoyos
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Sección para asesores (no admin) */}
                    {isAsesor && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                Panel de Asesor
                            </h3>
                            <div className="space-y-3">
                                <Link 
                                    to="/crear/participacion" 
                                    className="block w-full text-left bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Participación
                                </Link>
                                <Link 
                                    to="/crear/evento" 
                                    className="block w-full text-left bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Evento
                                </Link>
                                <Link 
                                    to="/crear/proyecto" 
                                    className="block w-full text-left bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Crear Proyecto
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Sección común para todos los usuarios */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Acciones Generales
                        </h3>
                        <div className="space-y-3">
                            <Link 
                                to="/visualizar/alumnos" 
                                className="block w-full text-left bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Ver Alumnos
                            </Link>
                            <Link 
                                to="/visualizar/eventos" 
                                className="block w-full text-left bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Ver Eventos
                            </Link>
                            <Link 
                                to="/visualizar/proyectos" 
                                className="block w-full text-left bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Ver Proyectos
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <TablaPrincipal />
                </div>
            </div>
        </div>
    );
}

export default Perfil;