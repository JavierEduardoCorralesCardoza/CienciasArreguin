import React, {useEffect, useState} from "react";
import postProyectoPorEvento from "../apis/post/postProyectoPorEvento";
import getGeneral from "../apis/get/getGeneral";

function CrearProyectoPorEvento(){

    const [proyectos, setProyectos] = useState(null);
    const [eventos, setEventos] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const proyectos = await getGeneral("proyectos");
            setProyectos(proyectos);

            const eventos = await getGeneral("eventos");
            setEventos(eventos);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        postProyectoPorEvento(event);
    }

    return(
        <div>
            <h3>Crear Proyecto Por Evento</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="proyectoEventoId">Proyecto:</label>
                <select id="proyectoEventoId" name="proyectoEventoId">
                    <option value="" disabled selected>Seleccione un proyecto</option>
                    {proyectos ? proyectos.map(proyecto => (
                        <option key={proyecto.idProyecto} value={proyecto.idProyecto}>{proyecto.nombreProyecto}</option>
                    )) : <option>Loading...</option>}
                </select>
                <label htmlFor="eventoProyectoId">Evento:</label>
                <select id="eventoProyectoId" name="eventoProyectoId">
                    <option value="" disabled selected>Seleccione un evento</option>
                    {eventos ? eventos.map(evento => (
                        <option key={evento.idEvento} value={evento.idEvento}>{evento.nombreEvento}</option>
                    )) : <option>Loading...</option>}
                </select>
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default CrearProyectoPorEvento;