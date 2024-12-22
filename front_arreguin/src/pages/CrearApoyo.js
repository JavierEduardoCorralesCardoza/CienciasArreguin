import React, {useState, useEffect} from 'react'
import postApoyo from '../apis/post/postApoyo';
import getGeneral from '../apis/get/getGeneral';

function CrearApoyo(){

    const [alumnosPorEvento, setAlumnosPorEvento] = useState(null);
    const [asesoresPorEvento, setAsesoresPorEvento] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const alumnosPorEvento = await getGeneral("alumno_por_evento");
            setAlumnosPorEvento(alumnosPorEvento);

            const asesoresPorEvento = await getGeneral("asesor_por_evento");
            setAsesoresPorEvento(asesoresPorEvento);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        postApoyo(event);
    }

    return(
        <div>
            <h3>Crear Apoyo</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="apoyoPatrocinador">Patrocinador:</label>
                <input type="text" id="apoyoPatrocinador" name="apoyoPatrocinador" />
                <label htmlFor="apoyoDescripcion">Descripcion del apoyo:</label>
                <input type="text" id="apoyoDescripcion" name="apoyoDescripcion" />
                <label htmlFor="apoyoIdAlumnoPorEvento">Alumno y Evento:</label>
                <select id="apoyoIdAlumnoPorEvento" name="apoyoIdAlumnoPorEvento">
                    <option value="" disabled selected>Seleccione un alumno y evento</option>
                    {alumnosPorEvento ? alumnosPorEvento.map(alumnoPorEvento => (
                        <option key={alumnoPorEvento.idAlumnoPorEvento} value={alumnoPorEvento.idAlumnoPorEvento}>{alumnoPorEvento.idAlumnoEvento.nombreAlumno} - {alumnoPorEvento.idEventoAlumno.nombreEvento}</option>
                    )) : <option>Loading...</option>}
                </select>
                <label htmlFor="apoyoIdAsesorPorEvento">Asesor y Evento:</label>
                <select id="apoyoIdAsesorPorEvento" name="apoyoIdAsesorPorEvento">
                    <option value="" disabled selected>Seleccione un asesor y evento</option>
                    {asesoresPorEvento ? asesoresPorEvento.map(asesorPorEvento => (
                        <option key={asesorPorEvento.idAsesorPorEvento} value={asesorPorEvento.idAsesorPorEvento}>{asesorPorEvento.idAsesorEvento.nombreAsesor} - {asesorPorEvento.idEventoAsesor.nombreEvento}</option>
                    )) : <option>Loading...</option>}
                </select>
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default CrearApoyo;