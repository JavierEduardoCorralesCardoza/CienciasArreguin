import API_URL from "../../utils/config";
import apiService from "../apiService.js";

async function putAsesor(event,id) {

    const data = {
        correoAsesor: event.target.correoAsesor.value,
        contrasenaAsesor: event.target.contrasenaAsesor.value,
        nombreAsesor: event.target.nombreAsesor.value,
        imagenAsesor: event.target.imagenAsesor.value
    };

    try {
        const response = await apiService.put(`/asesores/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putAsesor;