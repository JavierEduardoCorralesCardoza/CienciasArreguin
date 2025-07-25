import React from "react";
import postAlumno from "../../apis/post/postAlumno";
import { FormContainer, Form, InputField, FileInput, SubmitButton, BackButton } from "../../components/ui/FormComponents";

function CrearAlumno() {
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await postAlumno(event);
            alert("Alumno creado exitosamente!");
        } catch (error) {
            alert(`${error.message || "No se pudo crear el alumno"}`);
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
                <FormContainer title="Crear Alumno">
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Correo del Alumno:"
                            type="email"
                            id="alumnmoCorreo"
                            name="alumnmoCorreo"
                            required
                        />
                        
                        <InputField
                            label="Contraseña del Alumno:"
                            type="password"
                            id="alumnmoContraseña"
                            name="alumnmoContraseña"
                            required
                        />
                        
                        <InputField
                            label="Nombre del Alumno:"
                            type="text"
                            id="alumnmoNombre"
                            name="alumnmoNombre"
                            required
                        />
                        
                        <FileInput
                            label="Foto del Alumno:"
                            id="alumnmoFoto"
                            name="alumnmoFoto"
                        />
                        
                        <SubmitButton>
                            Crear Alumno
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
}

export default CrearAlumno;