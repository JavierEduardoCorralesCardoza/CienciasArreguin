import apiService from "../apiService.js";

async function getByIdGeneral(id, ruta) {
    try {
        const data = await apiService.get(`/${ruta}/busqueda?id=${id}`);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
}

export default getByIdGeneral;
