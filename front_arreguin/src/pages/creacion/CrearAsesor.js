import React from "react";
import postAsesor from "../../apis/post/postAsesor";

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
        <div>
            <h3>Crear Asesor</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="asesorCorreo">Correo del Asesor:</label>
                <input type="text" id="asesorCorreo" name="asesorCorreo" />
                
                <label htmlFor="asesorContraseña">Contraseña del Asesor:</label>
                <input type="text" id="asesorContraseña" name="asesorContraseña" />
                
                <label htmlFor="asesorNombre">Nombre del Asesor:</label>
                <input type="text" id="asesorNombre" name="asesorNombre" />
                
                <label htmlFor="asesorFoto">Foto del Asesor (URL):</label>
                <input type="text" id="asesorFoto" name="asesorFoto" />
                
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CrearAsesor;