import API_URL from "../../utils/config";

function postApoyo(event) {
    
    const data = {
        patrocinadorApoyo: event.target.apoyoPatrocinador.value,
        descripcionApoyo: event.target.apoyoDescripcion.value,
        idAlumnoPorEventoApoyo: {idAlumnoPorEvento: event.target.apoyoIdAlumnoPorEvento.value},
        idAsesorPorEventoApoyo: {idAsesorPorEvento: event.target.apoyoIdAsesorPorEvento.value}
    };

    console.log(data);
    
    fetch(`${API_URL}/apoyos`, {
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

export default postApoyo;