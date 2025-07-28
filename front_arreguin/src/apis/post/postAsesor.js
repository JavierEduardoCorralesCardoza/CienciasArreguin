import apiService from "../apiService.js";

async function postAsesor(event) {

    const fileInput = event.target.asesorFoto;
    const file = fileInput?.files?.[0] ?? null;

    const formData = new FormData();
    formData.append('correoAsesor', event.target.asesorCorreo.value);
    formData.append('contrasenaAsesor', event.target.asesorContraseña.value);
    formData.append('nombreAsesor', event.target.asesorNombre.value);

    if (file) {
        formData.append('image', file);
    }

    try {
        const response = await apiService.request('/asesores', {
            method: 'POST',
            body: formData,
            auth: true,
            isFormData: true
        });
        return response;
    } catch (error) {
        console.error('Error al crear asesor:', error);
        throw new Error(`Error al crear el asesor: ${error.message || 'Error desconocido'}`);
    }
}

export default postAsesor;