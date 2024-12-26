import API_URL from "../../utils/config";

function putProyecto(event, id) {
    
    const data = {
        nombreProyecto: event.target.proyectoNombre.value,
        categoriaProyecto: event.target.proyectoCategoria.value,
        descripcionProyecto: event.target.proyectoDescripcion.value
    };
    
    fetch(`${API_URL}/proyectos/${id}`, {
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

export default putProyecto;