import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import estructura_clases from "../../utils/estructura_clases";
import getByIdGeneral from "../../apis/getById/getByIdGeneral"
import putAlumno from "../../apis/put/putAlumno";
import putAsesor from "../../apis/put/putAsesor";
import putEvento from "../../apis/put/putEvento";
import putProyecto from "../../apis/put/putProyecto";
import putApoyo from "../../apis/put/putApoyo";

function PerfilGeneral(){

    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edicion, setEdicion] = useState(null);

    const {entidad, id} = useParams();

    const atributos = Object.keys(estructura_clases.entidades[entidad].atributos);

    useEffect(() => {
        const getData = async () => {
            const response = await getByIdGeneral(id, estructura_clases.entidades[entidad].plural);
            setData(response);
        }
        getData();
    }, [entidad, id]);

    useEffect(() => {
        if(data){
            setEdicion(data);
        }
    }, [data]);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        if(entidad === "alumno"){
            putAlumno(event, id);
        }
        else if(entidad === "asesor"){
            putAsesor(event, id);
        }
        else if(entidad === "evento"){
            putEvento(event, id);
        }
        else if(entidad === "proyecto"){
            putProyecto(event, id);
        }
        else if(entidad === "apoyo"){
            putApoyo(event, id);
        }
    };

    const handleInputEdicion = (event) => {
        setEdicion({
            ...edicion,
            [event.target.name]: event.target.value
        });
    };

    return(
        <div>
            <div>
                <h1>Perfil de {entidad}</h1>
                <button type="button" onClick={() => setIsModalOpen(prevState => !prevState)}>Editar</button>
            </div>
            {isModalOpen && (
                <div>
                    <h3>Editar Apoyo</h3>
                    <form onSubmit={handleEditSubmit}>
                        {!data ? (<p>Cargando...</p>) : (
                            <div>
                                <div>
                                    {atributos.map((atributo) => (
                                        <div key={atributo}>
                                            <label key={atributo} htmlFor={atributo}>{atributo}</label>
                                            <input type={estructura_clases.entidades[entidad].atributos[atributo].tipo} id={atributo} name={atributo} value={edicion[atributo]} onChange={handleInputEdicion}/>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit">Editar</button>
                            </div>
                        )}
                    </form>
                </div>
            )}
            <div>
                <h3>Información del {entidad}</h3>
                {!entidad || !data ? (<p>Cargando...</p>) : (
                    <div>
                        {atributos.map((atributo) => (
                            <p key={atributo}>{atributo}: {data[atributo]}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PerfilGeneral;