import React, {useEffect, useState} from "react";
import postAlumnoPorEvento from "../apis/post/postAlumnoPorEvento";
import getGeneral from "../apis/get/getGeneral";

function CrearAlumnoPorEvento(){

    const [alumnos, setAlumnos] = useState(null);
    const [eventos, setEventos] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const alumnos = await getGeneral("alumnos");
            setAlumnos(alumnos);

            const eventos = await getGeneral("eventos");
            setEventos(eventos);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        postAlumnoPorEvento(event);
    }

    return(
        <div>
            <h3>Crear Alumno Por Evento</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="alumnoPorEventoResultado">Resultado:</label>
                <input type="text" id="alumnoPorEventoResultado" name="alumnoPorEventoResultado" required/>
                <label htmlFor="alumnoEventoId">Alumno:</label>
                <select id="alumnoEventoId" name="alumnoEventoId">
                    <option value="" disabled selected>Seleccione un alumno</option>
                    {alumnos ? alumnos.map(alumno => (
                        <option key={alumno.idAlumno} value={alumno.idAlumno}>{alumno.nombreAlumno}</option>
                    )) : <option>Loading...</option>}
                </select>
                <label htmlFor="eventoAlumnoId">Evento:</label>
                <select id="eventoAlumnoId" name="eventoAlumnoId">
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

export default CrearAlumnoPorEvento