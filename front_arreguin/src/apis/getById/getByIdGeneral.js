import API_URL from "../../utils/config";

async function getByIdGeneral(id, ruta) {
    try {
        const response = await fetch(`${API_URL}/${ruta}/busqueda?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
}

export default getByIdGeneral;
