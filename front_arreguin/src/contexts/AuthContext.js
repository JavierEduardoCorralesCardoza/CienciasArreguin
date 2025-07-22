// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL base de tu API backend
    const API_BASE_URL = 'http://localhost:8080';

    // Verificar token al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            validateToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Added for CORS
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token && data.idUsuario > 0) {
                    setCurrentUser({
                        id: data.idUsuario,
                        email: data.mensaje || '',
                        tipo: data.tipoUsuario,
                        nombre: data.nombreUsuario,
                        token: data.token,
                        rol: data.rol || null // Agregar rol
                    });
                } else {
                    localStorage.removeItem('authToken');
                }
            } else {
                localStorage.removeItem('authToken');
            }
        } catch (error) {
            console.error('Error validando token:', error);
            localStorage.removeItem('authToken');
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email, password: '***' });
            
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Added for CORS
                body: JSON.stringify({
                    correo: email,
                    contrasena: password
                })
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok && data.token) {
                const user = {
                    id: data.idUsuario,
                    email: email,
                    tipo: data.tipoUsuario,
                    nombre: data.nombreUsuario,
                    token: data.token,
                    rol: data.rol || null // Agregar rol del login
                };
                
                localStorage.setItem('authToken', data.token);
                setCurrentUser(user);
                console.log('Token stored:', data.token.substring(0, 20) + '...');
                console.log('User role:', data.rol);
                return Promise.resolve(user);
            } else {
                throw new Error(data.mensaje || 'Error en el login');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setCurrentUser(null);
    };

    // Función para verificar si el usuario es admin
    const isAdmin = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return false;

        try {
            const response = await authenticatedFetch(`${API_BASE_URL}/auth/is-admin`);
            
            if (response.ok) {
                const isAdmin = await response.json();
                return isAdmin;
            }
            return false;
        } catch (error) {
            console.error('Error verificando admin:', error);
            return false;
        }
    };

    // Función para obtener el rol del usuario
    const getUserRole = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;

        try {
            const response = await authenticatedFetch(`${API_BASE_URL}/auth/role`);
            
            if (response.ok) {
                const role = await response.text();
                return role === 'null' || role === '' ? null : role;
            }
            return null;
        } catch (error) {
            console.error('Error obteniendo rol:', error);
            return null;
        }
    };

    // New function to make authenticated requests
    const authenticatedFetch = async (url, options = {}) => {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            throw new Error('No authentication token available');
        }

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
            credentials: 'include',
        };

        console.log('Making authenticated request to:', url);
        console.log('With headers:', config.headers);

        const response = await fetch(url, config);
        
        if (response.status === 401) {
            console.log('401 received, logging out user');
            logout();
            throw new Error('Session expired, please login again');
        }

        return response;
    };

    const getCurrentUserInfo = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;

        try {
            const response = await authenticatedFetch(`${API_BASE_URL}/auth/me`);

            if (response.ok) {
                const data = await response.json();
                return data;
            }
            return null;
        } catch (error) {
            console.error('Error obteniendo info del usuario:', error);
            return null;
        }
    };

    // Función helper para verificar permisos de admin
    const requireAdmin = async () => {
        const adminStatus = await isAdmin();
        if (!adminStatus) {
            throw new Error('Acceso denegado: se requieren permisos de administrador');
        }
        return adminStatus;
    };

    // Función para verificar si el usuario actual tiene un rol específico
    const hasRole = (requiredRole) => {
        if (!currentUser || !currentUser.rol) return false;
        return currentUser.rol.toLowerCase() === requiredRole.toLowerCase();
    };

    const value = {
        currentUser,
        login,
        logout,
        getCurrentUserInfo,
        authenticatedFetch, // Export this for making authenticated requests
        isAdmin, // Nueva función para verificar admin
        getUserRole, // Nueva función para obtener rol
        requireAdmin, // Helper para requerir permisos admin
        hasRole, // Helper para verificar roles
        // Propiedades de conveniencia
        isAsesor: currentUser?.tipo === 'asesor',
        isAlumno: currentUser?.tipo === 'alumno',
        isAdminUser: currentUser?.rol?.toLowerCase() === 'admin', // Verificación local del rol
        userRole: currentUser?.rol || null, // Rol actual del usuario
        token: currentUser?.token || localStorage.getItem('authToken')
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};