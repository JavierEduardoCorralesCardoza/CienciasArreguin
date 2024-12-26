import React, {useEffect, useState} from "react";
import postParticipacion from "../../apis/post/postParticipacion";
import getGeneral from "../../apis/get/getGeneral";

function CrearParticipacion(){

    const [alumnos, setAlumnos] = useState(null);
    const [asesores, setAsesores] = useState(null);
    const [eventos, setEventos] = useState(null);
    const [proyectos, setProyectos] = useState(null);
    const [apoyo, setApoyo] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            let response

            response = await getGeneral('alumnos');
            setAlumnos(response);

            response = await getGeneral('asesores');
            setAsesores(response);

            response = await getGeneral('eventos');
            setEventos(response);

            response = await getGeneral('proyectos');
            setProyectos(response);

            response = await getGeneral('apoyos');
            setApoyo(response);
        }

        getData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        postParticipacion(event);
    }

    return(
        <div>
            <h3>Crear Paricipacion</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="alumnoParticipacionId">Alumno:</label>
                <select id="alumnoParticipacionId" name="alumnoParticipacionId">
                    <option value="" disabled selected>Selecciona un alumno</option>
                    {alumnos && alumnos.map((alumno) => {
                        return <option key={alumno.idAlumno} value={alumno.idAlumno}>{alumno.nombreAlumno}</option>
                    })}
                </select>
                <label htmlFor="asesorParticipacionId">Asesor:</label>
                <select id="asesorParticipacionId" name="asesorParticipacionId">
                    <option value="" selected>Selecciona un asesor</option>
                    {asesores && asesores.map((asesor) => {
                        return <option key={asesor.idAsesor} value={asesor.idAsesor}>{asesor.nombreAsesor}</option>
                    })}
                </select>
                <label htmlFor="eventoParticipacionId">Evento:</label>
                <select id="eventoParticipacionId" name="eventoParticipacionId">
                    <option value="" selected>Selecciona un evento</option>
                    {eventos && eventos.map((evento) => {
                        return <option key={evento.idEvento} value={evento.idEvento}>{evento.nombreEvento}</option>
                    })}
                </select>
                <label htmlFor="proyectoParticipacionId">Proyecto:</label>
                <select id="proyectoParticipacionId" name="proyectoParticipacionId">
                    <option value="" selected>Selecciona un proyecto</option>
                    {proyectos && proyectos.map((proyecto) => {
                        return <option key={proyecto.idProyecto} value={proyecto.idProyecto}>{proyecto.nombreProyecto}</option>
                    })}
                </select>
                <label htmlFor="apoyoAlumnoParticipacionId">Apoyo Alumno:</label>
                <select id="apoyoAlumnoParticipacionId" name="apoyoAlumnoParticipacionId">
                    <option value="" selected>Selecciona un apoyo</option>
                    {apoyo && apoyo.map((apoyo) => {
                        return <option key={apoyo.idApoyo} value={apoyo.idApoyo}>{apoyo.descripcionApoyo}</option>
                    })}
                </select>
                <label htmlFor="apoyoAsesorParticipacionId">Apoyo Asesor:</label>
                <select id="apoyoAsesorParticipacionId" name="apoyoAsesorParticipacionId">
                    <option value="" selected>Selecciona un apoyo</option>
                    {apoyo && apoyo.map((apoyo) => {
                        return <option key={apoyo.idApoyo} value={apoyo.idApoyo}>{apoyo.descripcionApoyo}</option>
                    })}
                </select>
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default CrearParticipacion;