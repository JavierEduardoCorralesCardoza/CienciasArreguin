import API_URL from "../../utils/config";

function putEvento(event, id) {
    
    const data = {
        nombreEvento: event.target.nombreEvento.value,
        fechaEvento: event.target.fechaEvento.value
    };
    
    fetch(`${API_URL}/eventos/${id}`, {
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

export default putEvento;