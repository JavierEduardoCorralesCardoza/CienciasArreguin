import API_URL from '../utils/config.js';

function postEvento(event) {

    const data = {
        nombre_evento: event.target.eventoNombre.value,
        fecha_evento: event.target.eventoFecha.value,
    };
    
    fetch(`${API_URL}/eventos`, {
        method: 'POST',
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

export default postEvento;