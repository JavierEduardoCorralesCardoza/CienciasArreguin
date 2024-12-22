import React from "react";
import postEvento from "../apis/post/postEvento";

function CrearEvento(){
    const handleSubmit = (event) => {
        event.preventDefault();
        postEvento(event);
    };

    return(
        <div>
            <h3>Crear Evento</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="eventoNombre">Nombre del Evento:</label>
                <input type="text" id="eventoNombre" name="eventoNombre" />
                <label htmlFor="eventoFecha">Fecha del evento:</label>
                <input type="date" id="eventoFecha" name="eventoFecha" />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CrearEvento;