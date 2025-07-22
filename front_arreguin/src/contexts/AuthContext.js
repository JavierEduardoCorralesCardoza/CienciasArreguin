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
                        token: data.token
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
                    token: data.token
                };
                
                localStorage.setItem('authToken', data.token);
                setCurrentUser(user);
                console.log('Token stored:', data.token.substring(0, 20) + '...');
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

    const value = {
        currentUser,
        login,
        logout,
        getCurrentUserInfo,
        authenticatedFetch, // Export this for making authenticated requests
        isAsesor: currentUser?.tipo === 'asesor',
        isAlumno: currentUser?.tipo === 'alumno',
        token: currentUser?.token || localStorage.getItem('authToken')
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};