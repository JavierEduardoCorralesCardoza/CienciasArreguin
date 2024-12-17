import API_URL from '../utils/config.js';

function postAsesorPorEvento(event) {

    const data = {
        id_asesor_evento: event.target.asesorEventoId.value,
        id_evento_asesor: event.target.eventoAsesorId.value,
    };
    
    fetch(`${API_URL}/asesor_por_evento`, {
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

export default postAsesorPorEvento;