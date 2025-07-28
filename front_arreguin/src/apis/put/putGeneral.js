import apiService from "../apiService.js";
import estructuraClases from "../../utils/estructura_clases.json";

async function putGeneral(entityType, event, id, originalData) {
    if (entityType === 'participacion') throw new Error('Participación no permitida - usar putParticipacion');
    
    const entity = estructuraClases.entidades[entityType];
    if (!entity) throw new Error(`Entidad ${entityType} no encontrada`);

    const hasFileUpload = Object.keys(entity.atributos).some(attr => attr.includes('imagen'));
    
    try {
        if (hasFileUpload) {
            const formData = new FormData();
            let hasChanges = false;

            Object.entries(entity.atributos).forEach(([key, config]) => {
                // Usar directamente el nombre del atributo como name del campo
                const value = event.target[key]?.value;
                const file = event.target[key]?.files?.[0];
                
                if (key.includes('imagen') && file) {
                    formData.append('image', file);
                    hasChanges = true;
                } else if (value && value !== originalData[key]) {
                    formData.append(key, value);
                    hasChanges = true;
                }
            });

            if (!hasChanges) return originalData; // No hay cambios

            return await apiService.request(`/${entity.plural}/${id}`, {
                method: 'PUT',
                body: formData,
                auth: true,
                isFormData: true
            });
        } else {
            // Sin imagen (JSON)
            const data = Object.fromEntries(
                Object.entries(entity.atributos)
                    .map(([key, config]) => [key, event.target[key]?.value]) // Usar key directamente
                    .filter(([key, value]) => value && value !== originalData[key])
            );

            if (Object.keys(data).length === 0) return originalData; // No hay cambios

            return await apiService.put(`/${entity.plural}/${id}`, data);
        }
    } catch (error) {
        if (hasFileUpload) {
            if (error.status === 400) alert('Error: El correo ya está en uso');
            else if (error.type === 'NETWORK_ERROR') alert('Error de conexión');
            else alert(`Error al actualizar: ${error.message}`);
            throw error;
        } else {
            console.error('Error:', error);
            return null;
        }
    }
}

export default putGeneral;