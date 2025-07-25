import React from "react";
import postAsesor from "../../apis/post/postAsesor";
import { FormContainer, Form, InputField, FileInput, SubmitButton, BackButton } from "../../components/ui/FormComponents";

function CrearAsesor() {
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await postAsesor(event);
            alert("Asesor creado exitosamente!");
        } catch (error) {
            alert(`${error.message || "No se pudo crear el asesor"}`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 max-w-md mx-auto">
                    <BackButton>
                        ← Regresar
                    </BackButton>
                </div>
                <FormContainer title="Crear Asesor">
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Correo del Asesor:"
                            type="email"
                            id="asesorCorreo"
                            name="asesorCorreo"
                            required
                        />
                        
                        <InputField
                            label="Contraseña del Asesor:"
                            type="password"
                            id="asesorContraseña"
                            name="asesorContraseña"
                            required
                        />
                        
                        <InputField
                            label="Nombre del Asesor:"
                            type="text"
                            id="asesorNombre"
                            name="asesorNombre"
                            required
                        />
                        
                        <FileInput
                            label="Foto del Asesor:"
                            id="asesorFoto"
                            name="asesorFoto"
                        />
                        
                        <SubmitButton>
                            Crear Asesor
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
}

export default CrearAsesor;