import apiService from "../apiService.js";
import { entidades } from "../../utils/estructura_clases.json" assert { type: "json" };

async function postGeneral(entityType, event) {
    if (entityType === 'participacion') throw new Error('Participación no permitida');
    
    const entity = entidades[entityType];
    if (!entity) throw new Error(`Entidad ${entityType} no encontrada`);

    const hasFileUpload = Object.keys(entity.atributos).some(attr => attr.includes('imagen'));
    
    if (hasFileUpload) {
        const formData = new FormData();
        Object.entries(entity.atributos).forEach(([key, config]) => {
            const value = event.target[config.fieldName]?.value;
            const file = event.target[config.fieldName]?.files?.[0];
            
            if (key.includes('imagen') && file) {
                formData.append('image', file);
            } else if (value) {
                formData.append(key, value);
            }
        });

        return apiService.request(`/${entity.plural}`, {
            method: 'POST',
            body: formData,
            auth: true,
            isFormData: true
        });
    }

    const data = Object.fromEntries(
        Object.entries(entity.atributos).map(([key, config]) => 
            [key, event.target[config.fieldName]?.value]
        ).filter(([_, value]) => value)
    );

    return apiService.post(`/${entity.plural}`, data);
}

export default postGeneral;