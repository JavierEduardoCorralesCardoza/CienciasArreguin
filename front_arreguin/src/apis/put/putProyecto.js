import API_URL from "../../utils/config";
import apiService from "../apiService.js";

async function putProyecto(event, id) {

    const data = {
        nombreProyecto: event.target.nombreProyecto.value,
        categoriaProyecto: event.target.categoriaProyecto.value,
        descripcionProyecto: event.target.descripcionProyecto.value
    };

    try {
        const response = await apiService.put(`/proyectos/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putProyecto;