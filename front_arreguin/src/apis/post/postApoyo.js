import apiService from "../apiService.js";

async function postApoyo(event) {

    try {
        const data = {
            patrocinadorApoyo: event.target.apoyoPatrocinador.value,
            descripcionApoyo: event.target.apoyoDescripcion.value
        };

        const response = await apiService.post('/apoyos', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postApoyo;