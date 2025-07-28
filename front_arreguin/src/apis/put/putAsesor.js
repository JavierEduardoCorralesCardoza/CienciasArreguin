import apiService from "../apiService.js";

async function putAsesor(event, id) {
    try {
        const formData = new FormData();
        formData.append('correoAsesor', event.target.correoAsesor.value);
        formData.append('contrasenaAsesor', event.target.contrasenaAsesor.value);
        formData.append('nombreAsesor', event.target.nombreAsesor.value);

        const imageFile = event.target.imagenAsesor?.files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await apiService.request(`/asesores/${id}`, {
            method: 'PUT',
            body: formData
        });
        
        return response;
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Type:', error.type);
        console.error('Response data:', error.data);
        
        if (error.type === 'VALIDATION_ERROR' || error.status === 400) {
            alert(error.message || 'Error: El correo ya está en uso');
        } else if (error.type === 'NETWORK_ERROR') {
            alert('Error de conexión. Verifique su conexión a internet.');
        } else if (error.status === 415) {
            alert('Error: Problema con el formato de datos. Verifique la configuración del servidor.');
        } else {
            alert('Error al actualizar el asesor: ' + error.message);
        }
        
        throw error;
    }
}

export default putAsesor;