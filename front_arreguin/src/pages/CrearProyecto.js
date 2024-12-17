import React from "react";
import postProyecto from "../apis/postProyecto";

function CrearProyecto(){
    const handleSubmit = (event) => {
        event.preventDefault();
        postProyecto(event);
    };
    return(
        <div>
            <h3>Crear Proyecto</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="proyectoNombre">Nombre del Proyecto:</label>
                <input type="text" id="proyectoNombre" name="proyectoNombre" />
                <label htmlFor="proyectoCategoria">Categoria del Proyecto:</label>
                <input type="text" id="proyectoCategoria" name="proyectoCategoria" />
                <label htmlFor="proyectoDescripcion">Descripcion del Proyecto:</label>
                <input type="text" id="proyectoDescripcion" name="proyectoDescripcion" />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CrearProyecto;