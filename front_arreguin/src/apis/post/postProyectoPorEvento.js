import API_URL from "../../utils/config";

function postProyectoPorEvento(event){

    const data = {
        idProyectoEvento: {idProyecto: event.target.proyectoEventoId.value},
        idEventoProyecto: {idEvento: event.target.eventoProyectoId.value}
    };

    console.log(data);

    fetch(`${API_URL}/proyecto_por_evento`, {
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

export default postProyectoPorEvento;