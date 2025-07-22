import API_URL from '../../utils/config.js';
import apiService from "../apiService.js";

async function postProyecto(event) {

    const data = {
        nombreProyecto: event.target.proyectoNombre.value,
        categoriaProyecto: event.target.proyectoCategoria.value,
        descripcionProyecto: event.target.proyectoDescripcion.value
    };

    try {
        const response = await apiService.post('/proyectos', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postProyecto;