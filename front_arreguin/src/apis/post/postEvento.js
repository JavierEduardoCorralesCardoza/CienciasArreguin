import apiService from "../apiService.js";

async function postEvento(event) {

    const data = {
        nombreEvento: event.target.eventoNombre.value,
        fechaEvento: event.target.eventoFecha.value
    };

    try {
        const response = await apiService.post('/eventos', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postEvento;