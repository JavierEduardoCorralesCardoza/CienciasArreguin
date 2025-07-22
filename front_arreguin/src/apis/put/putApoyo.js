import apiService from "../apiService.js";

async function putApoyo(event,id) {

    const data = {
        patrocinadorApoyo: event.target.patrocinadorApoyo.value,
        descripcionApoyo: event.target.descripcionApoyo.value
    };

    try {
        const response = await apiService.put(`/apoyos/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putApoyo;