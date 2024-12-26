import API_URL from "../../utils/config";

function putApoyo(event,id) {
    
    const data = {
        patrocinadorApoyo: event.target.apoyoPatrocinador.value,
        descripcionApoyo: event.target.apoyoDescripcion.value
    };
    
    fetch(`${API_URL}/apoyos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default putApoyo;