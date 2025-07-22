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
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postAsesor;