import apiService from "../apiService.js";

async function getGeneral(ruta) {
    try {
        const data = await apiService.get(`/${ruta}`);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default getGeneral;