// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole = null }) {
    const { currentUser, isAsesor, isAlumno } = useAuth();
    
    // Si no hay usuario logueado, redirigir al login
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    // Si se requiere un rol específico y el usuario no lo tiene
    if (requiredRole) {
        if (requiredRole === 'asesor' && !isAsesor) {
            return <div>No tienes permisos para acceder a esta página</div>;
        }
        if (requiredRole === 'alumno' && !isAlumno) {
            return <div>No tienes permisos para acceder a esta página</div>;
        }
    }
    
    return children;
}

export default ProtectedRoute;