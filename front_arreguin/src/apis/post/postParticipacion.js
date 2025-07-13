import API_URL from "../../utils/config";

function postParticipacion(formData) {
    // Validate input data
    if (!formData) {
        throw new Error('Form data is required');
    }
    
    // Check for required fields
    const requiredFields = [
        'alumnoParticipacionId',
        'asesorParticipacionId',
        'eventoParticipacionId',
        'proyectoParticipacionId',
        'apoyoAlumnoParticipacionId',
        'apoyoAsesorParticipacionId'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field] === '');
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    const data = {
        idAlumnoParticipacion: parseInt(formData.alumnoParticipacionId),
        idAsesorParticipacion: parseInt(formData.asesorParticipacionId),
        idEventoParticipacion: parseInt(formData.eventoParticipacionId),
        idProyectoParticipacion: parseInt(formData.proyectoParticipacionId),
        idApoyoAlumnoParticipacion: parseInt(formData.apoyoAlumnoParticipacionId),
        idApoyoAsesorParticipacion: parseInt(formData.apoyoAsesorParticipacionId)
    };
    
    console.log('FormData received:', formData);
    console.log('Data being sent to API:', data);
    console.log('JSON payload:', JSON.stringify(data, null, 2));
    
    return fetch(`${API_URL}/participaciones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            return response.text().then(errorText => {
                console.log('Error response body:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export default postParticipacion;