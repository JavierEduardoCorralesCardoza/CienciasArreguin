import apiService from "../apiService.js";

async function deleteGeneral(ruta) {
    try {
        const response = await apiService.delete(`/${ruta}`);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default deleteGeneral;
