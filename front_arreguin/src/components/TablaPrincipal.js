import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import getGeneral from "../apis/get/getGeneral";

function TablaPrincipal() {

    const [participaciones, setParticipaciones] = useState([]);
    const [participacionesFiltradas, setParticipacionesFiltradas] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [asesores, setAsesores] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const [filtros, setFiltros] = useState({
        alumno: "",
        asesor: "",
        evento: "",
        proyecto: "",
        apoyo: "",
    });

    useEffect(() => {
        const getParticipaciones = async () => {
            const response = await getGeneral("participaciones");
            setParticipaciones(response);
            setParticipacionesFiltradas(response);
        }
        getParticipaciones();

        const getFiltros = async () => {
            let response
            response = await getGeneral("alumnos");
            setAlumnos(response);

            response = await getGeneral("asesores");
            setAsesores(response);

            response = await getGeneral("eventos");
            setEventos(response);

            response = await getGeneral("proyectos");
            setProyectos(response);

            response = await getGeneral("apoyos");
            setApoyos(response);
        }
        getFiltros();
    }, []);

    const aplicarFiltros = () => {
        let newParticipaciones

        newParticipaciones = participaciones.filter((participacion) => {
            if(filtros.alumno !== ""){
                return participacion.idAlumnoParticipacion.idAlumno.toString() === filtros.alumno;
            }

            return true;
        });

        newParticipaciones = newParticipaciones.filter((participacion) => {
            if(filtros.asesor !== ""){
                return participacion.idAsesorParticipacion.idAsesor.toString() === filtros.asesor;
            }

            return true;
        });

        newParticipaciones = newParticipaciones.filter((participacion) => {
            if(filtros.evento !== ""){
                return participacion.idEventoParticipacion.idEvento.toString() === filtros.evento;
            }

            return true;
        });

        newParticipaciones = newParticipaciones.filter((participacion) => {
            if(filtros.proyecto !== ""){
                return participacion.idProyectoParticipacion.idProyecto.toString() === filtros.proyecto;
            }

            return true;
        });

        newParticipaciones = newParticipaciones.filter((participacion) => {
            if(filtros.apoyo !== ""){
                return participacion.idApoyoAlumnoParticipacion.idApoyo.toString() === filtros.apoyo || participacion.idApoyoAsesorParticipacion.idApoyo.toString() === filtros.apoyo;
            }

            return true;
        });
        setParticipacionesFiltradas(newParticipaciones);
    }

    const handleFilters = (e, filtro) => {
        setFiltros({
            ...filtros,
            [filtro]: e.target.value
        });
    }

    return (
        <div>
            <h1>Tabla Principal</h1>
            
            { !participaciones || !alumnos || !asesores || !eventos || !proyectos || !apoyos ? (<div>Cargando...</div>) : 
            (
                <div>
                    <form>
                        <label>Filtro Alumno: </label>
                        <select onChange={(e) => handleFilters(e, "alumno")}>
                            <option value="">Todos</option>
                            {alumnos.map((alumno) => (
                                <option key={alumno.idAlumno} value={alumno.idAlumno}>{alumno.nombreAlumno}</option>
                            ))}
                        </select>
                        <label>Filtro Asesor: </label>
                        <select onChange={(e) => handleFilters(e, "asesor")}>
                            <option value="">Todos</option>
                            {asesores.map((asesor) => (
                                <option key={asesor.idAsesor} value={asesor.idAsesor}>{asesor.nombreAsesor}</option>
                            ))}
                        </select>
                        <label>Filtro Evento: </label>
                        <select onChange={(e) => handleFilters(e, "evento")}>
                            <option value="">Todos</option>
                            {eventos.map((evento) => (
                                <option key={evento.idEvento} value={evento.idEvento}>{evento.nombreEvento}</option>
                            ))}
                        </select>
                        <label>Filtro Proyecto: </label>
                        <select onChange={(e) => handleFilters(e, "proyecto")}>
                            <option value="">Todos</option>
                            {proyectos.map((proyecto) => (
                                <option key={proyecto.idProyecto} value={proyecto.idProyecto}>{proyecto.nombreProyecto}</option>
                            ))}
                        </select>
                        <label>Filtro Apoyo: </label>
                        <select onChange={(e) => handleFilters(e, "apoyo")}>
                            <option value="">Todos</option>
                            {apoyos.map((apoyo) => (
                                <option key={apoyo.idApoyo} value={apoyo.idApoyo}>{apoyo.descripcionApoyo}</option>
                            ))}
                        </select>
                        <button type="button" onClick={aplicarFiltros}>Filtrar</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>ID de la Participacion</th>
                                <th>Alumno</th>
                                <th>Asesor</th>
                                <th>Evento</th>
                                <th>Proyecto</th>
                                <th>Apoyo al Alumno</th>
                                <th>Apoyo al Asesor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participacionesFiltradas.map((participacion) => (
                                <tr key={participacion.idParticipacion}>
                                    <td><Link to={`/perfil/participacion/${participacion.idParticipacion}`}>{participacion.idParticipacion}</Link></td>
                                    <td><Link to={`/perfil/alumno/${participacion.idAlumnoParticipacion.idAlumno}`}>{participacion.idAlumnoParticipacion.nombreAlumno}</Link></td>
                                    <td><Link to={`/perfil/asesor/${participacion.idAsesorParticipacion.idAsesor}`}>{participacion.idAsesorParticipacion.nombreAsesor}</Link></td>
                                    <td><Link to={`/perfil/evento/${participacion.idEventoParticipacion.idEvento}`}>{participacion.idEventoParticipacion.nombreEvento}</Link></td>
                                    <td><Link to={`/perfil/proyecto/${participacion.idProyectoParticipacion.idProyecto}`}>{participacion.idProyectoParticipacion.nombreProyecto}</Link></td>
                                    <td><Link to={`/perfil/apoyo/${participacion.idApoyoAlumnoParticipacion.idApoyo}`}>{participacion.idApoyoAlumnoParticipacion.descripcionApoyo}</Link></td>
                                    <td><Link to={`/perfil/apoyo/${participacion.idApoyoAlumnoParticipacion.idApoyo}`}>{participacion.idApoyoAsesorParticipacion.descripcionApoyo}</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>        
            )}
        </div>
    );
}

export default TablaPrincipal;