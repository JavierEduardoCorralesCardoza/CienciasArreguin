import React, {useEffect, useState} from "react";
import postAsesorPorEvento from "../apis/post/postAsesorPorEvento";
import getGeneral from "../apis/get/getGeneral";

function CrearAsesorPorEvento(){

    const [asesores, setAsesores] = useState(null);
    const [eventos, setEventos] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const asesores = await getGeneral("asesores");
            setAsesores(asesores);

            const eventos = await getGeneral("eventos");
            setEventos(eventos);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        postAsesorPorEvento(event);
    }

    return(
        <div>
            <h3>Crear Asesor Por Evento</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="asesorEventoId">Asesor:</label>
                <select id="asesorEventoId" name="asesorEventoId">
                    <option value="" disabled selected>Seleccione un asesor</option>
                    {asesores ? asesores.map(asesor => (
                        <option key={asesor.idAsesor} value={asesor.idAsesor}>{asesor.nombreAsesor}</option>
                    )) : <option>Loading...</option>}
                </select>
                <label htmlFor="eventoAsesorId">Evento:</label>
                <select id="eventoAsesorId" name="eventoAsesorId">
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

export default CrearAsesorPorEvento