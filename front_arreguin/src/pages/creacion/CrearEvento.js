import React from "react";
import postEvento from "../../apis/post/postEvento";
import { FormContainer, Form, InputField, SubmitButton, BackButton } from "../../components/ui/FormComponents";

function CrearEvento() {
    const handleSubmit = (event) => {
        event.preventDefault();
        postEvento(event);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 max-w-md mx-auto">
                    <BackButton>
                        ← Regresar
                    </BackButton>
                </div>
                <FormContainer title="Crear Evento">
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Nombre del Evento:"
                            type="text"
                            id="eventoNombre"
                            name="eventoNombre"
                            required
                        />
                        
                        <InputField
                            label="Fecha del Evento:"
                            type="date"
                            id="eventoFecha"
                            name="eventoFecha"
                            required
                        />
                        
                        <SubmitButton>
                            Crear Evento
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
}

export default CrearEvento;