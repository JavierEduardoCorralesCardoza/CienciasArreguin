import API_URL from "../../utils/config";
import apiService from "../apiService.js";

async function putEvento(event, id) {

    const data = {
        nombreEvento: event.target.nombreEvento.value,
        fechaEvento: event.target.fechaEvento.value
    };

    try {
        const response = await apiService.put(`/eventos/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putEvento;