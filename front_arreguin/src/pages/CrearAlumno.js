import React from "react";
import postAlumno from "../apis/post/postAlumno";

function CrearAlumno(){

    const handleSubmit = (event) => {
        event.preventDefault();
        postAlumno(event);
    }

    return(
    <div>
        <h3>Crear Alumno</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="alumnmoCorreo">Correo del Alumnmo:</label>
            <input type="text" id="alumnmoCorreo" name="alumnmoCorreo" />
            <label htmlFor="alumnmoContraseña">Contraseña del Alumnmo:</label>
            <input type="text" id="alumnmoContraseña" name="alumnmoContraseña" />
            <label htmlFor="alumnmoNombre">Nombre del Alumnmo:</label>
            <input type="text" id="alumnmoNombre" name="alumnmoNombre" />
            <label htmlFor="alumnmoFoto">Foto del Alumnmo:</label>
            <input type="text" id="alumnmoFoto" name="alumnmoFoto" />
            <button type="submit">Crear</button>
        </form>
    </div>)
}

export default CrearAlumno;