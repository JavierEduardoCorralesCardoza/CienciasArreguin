import apiService from "../apiService.js";

async function postParticipacion(formData) {
    // Validate input data
    if (!formData) {
        throw new Error('Form data is required');
    }
    
    // Check for required fields
    const requiredFields = [
        'alumnoParticipacionId',
        'asesorParticipacionId',
        'eventoParticipacionId',
        'proyectoParticipacionId'
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
        idApoyoAlumnoParticipacion: parseInt(formData?.apoyoAlumnoParticipacionId || null),
        idApoyoAsesorParticipacion: parseInt(formData?.apoyoAsesorParticipacionId || null)
    };
    
    console.log('FormData received:', formData);
    console.log('Data being sent to API:', data);
    console.log('JSON payload:', JSON.stringify(data, null, 2));

    try {
        const response = await apiService.post('/participaciones', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postParticipacion;