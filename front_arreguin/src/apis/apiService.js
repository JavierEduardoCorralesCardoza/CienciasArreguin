// services/ApiService.js
class apiService {
    constructor() {
        this.baseURL = 'http://localhost:8080';
    }

    // Obtiene el token del localStorage
    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Headers por defecto para las peticiones
    getHeaders(includeAuth = true, isFormData = false) {
        const headers = {};
        
        // Only set Content-Type if not FormData
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

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
        const isFormData = options.body instanceof FormData;
        
        const config = {
            method: options.method || 'GET',
            headers: this.getHeaders(options.auth !== false, isFormData),
            ...options
        };

        // Remove body if GET/HEAD request
        if (['GET', 'HEAD'].includes(config.method.toUpperCase())) {
            delete config.body;
        }

        try {
            const response = await fetch(url, config);
            
            // Si el token es inválido, redirigir al login
            if (response.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                return null;
            }

            // Si la respuesta es exitosa, parsear y devolver los datos
            if (response.ok) {
                const data = await response.json();
                return data;
            }

            // Manejar errores HTTP
            await this.handleHttpError(response);

        } catch (error) {
            // Si es un error de red o fetch
            if (error.name === 'TypeError' || error.message.includes('fetch')) {
                const networkError = new Error('No se pudo conectar con el servidor. Verifique su conexión.');
                networkError.status = 0;
                networkError.type = 'NETWORK_ERROR';
                throw networkError;
            }
            
            // Re-lanzar otros errores ya procesados
            throw error;
        }
    }

    async handleHttpError(response) {
        let errorData;
        
        try {
            errorData = await response.json();
        } catch (parseError) {
            errorData = { 
                error: response.statusText,
                message: response.statusText,
                status: response.status.toString()
            };
        }

        const errorMessage = errorData.error || errorData.message || response.statusText;
        const errorType = this.getErrorType(response.status);

        const error = new Error(errorMessage);
        error.status = response.status;
        error.type = errorType;
        error.data = errorData;
        throw error;
    }

    getErrorType(status) {
        switch(status) {
            case 400: return 'VALIDATION_ERROR';
            case 401: return 'AUTH_ERROR';
            case 404: return 'NOT_FOUND_ERROR';
            case 409: return 'CONFLICT_ERROR';
            case 500: return 'SERVER_ERROR';
            default: return 'HTTP_ERROR';
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