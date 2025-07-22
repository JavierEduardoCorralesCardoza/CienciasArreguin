// services/ApiService.js
class apiService {
    constructor() {
        this.baseURL = 'http://localhost:8080'; // Cambia según tu configuración
    }

    // Obtiene el token del localStorage
    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Headers por defecto para las peticiones
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (includeAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    // Método genérico para hacer peticiones
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(options.auth !== false),
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            // Si el token es inválido, redirigir al login
            if (response.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                return null;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en petición HTTP:', error);
            throw error;
        }
    }

    // Métodos HTTP específicos
    async get(endpoint, options = {}) {
        return this.request(endpoint, { 
            method: 'GET', 
            ...options 
        });
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options
        });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            ...options
        });
    }
}

export default new apiService();