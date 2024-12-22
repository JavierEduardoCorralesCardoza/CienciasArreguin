import API_URL from '../../utils/config.js';

function postAsesorPorEvento(event) {

    const data = {
        idAsesorEvento: {idAsesor: event.target.asesorEventoId.value},
        idEventoAsesor: {idEvento: event.target.eventoAsesorId.value}
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