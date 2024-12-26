import API_URL from "../../utils/config";

function putAsesor(event,id) {
    
    const data = {
        correoAsesor: event.target.asesorCorreo.value,
        contrasenaAsesor: event.target.asesorContraseña.value,
        nombreAsesor: event.target.asesorNombre.value,
        imagenAsesor: event.target.asesorFoto.value
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