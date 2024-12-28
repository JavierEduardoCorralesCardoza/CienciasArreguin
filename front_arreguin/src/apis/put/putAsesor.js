import API_URL from "../../utils/config";

function putAsesor(event,id) {
    
    const data = {
        correoAsesor: event.target.correoAsesor.value,
        contrasenaAsesor: event.target.contrasenaAsesor.value,
        nombreAsesor: event.target.nombreAsesor.value,
        imagenAsesor: event.target.imagenAsesor.value
    };
    
    fetch(`${API_URL}/asesores/${id}`, {
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

export default putAsesor;