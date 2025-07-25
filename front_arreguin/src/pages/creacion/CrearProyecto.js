import React from "react";
import postProyecto from "../../apis/post/postProyecto";
import { FormContainer, Form, InputField, SubmitButton, BackButton } from "../../components/ui/FormComponents";

function CrearProyecto() {
    const handleSubmit = (event) => {
        event.preventDefault();
        postProyecto(event);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 max-w-md mx-auto">
                    <BackButton>
                        ← Regresar
                    </BackButton>
                </div>
                <FormContainer title="Crear Proyecto">
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Nombre del Proyecto:"
                            type="text"
                            id="proyectoNombre"
                            name="proyectoNombre"
                            required
                        />
                        
                        <InputField
                            label="Categoría del Proyecto:"
                            type="text"
                            id="proyectoCategoria"
                            name="proyectoCategoria"
                            required
                        />
                        
                        <InputField
                            label="Descripción del Proyecto:"
                            type="text"
                            id="proyectoDescripcion"
                            name="proyectoDescripcion"
                            required
                        />
                        
                        <SubmitButton>
                            Crear Proyecto
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
}

export default CrearProyecto;