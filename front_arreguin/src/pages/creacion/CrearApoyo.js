import React from 'react';
import postApoyo from '../../apis/post/postApoyo';
import { FormContainer, Form, InputField, SubmitButton, BackButton } from "../../components/ui/FormComponents";

function CrearApoyo() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        postApoyo(event);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 max-w-md mx-auto">
                    <BackButton>
                        ← Regresar
                    </BackButton>
                </div>
                <FormContainer title="Crear Apoyo">
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Patrocinador:"
                            type="text"
                            id="apoyoPatrocinador"
                            name="apoyoPatrocinador"
                            required
                        />
                        
                        <InputField
                            label="Descripción del Apoyo:"
                            type="text"
                            id="apoyoDescripcion"
                            name="apoyoDescripcion"
                            required
                        />
                        
                        <SubmitButton>
                            Crear Apoyo
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
}

export default CrearApoyo;