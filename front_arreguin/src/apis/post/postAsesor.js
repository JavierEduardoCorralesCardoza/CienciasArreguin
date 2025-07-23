import apiService from "../apiService.js";

async function postAsesor(event) {
    const data = {
        correoAsesor: event.target.asesorCorreo.value,
        contrasenaAsesor: event.target.asesorContraseña.value,
        nombreAsesor: event.target.asesorNombre.value,
        imagenAsesor: event.target.asesorFoto.value,
        rolAsesor: "asesor"
    };

    try {
        const response = await apiService.post('/asesores', data);
        console.log('Asesor creado exitosamente:', response);
        return response;
    } catch (error) {
        console.error('Error al crear asesor:', error);
        throw error;
    }
}

export default postAsesor;