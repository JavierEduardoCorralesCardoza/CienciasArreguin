import React, {useState, useEffect} from "react";
import getGeneral from "../apis/get/getGeneral";
import { useParams } from 'react-router-dom';

function TablaGeneral() {

    const [entidades, setEntidades] = useState(null);
    const [atributos, setAtributos] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [dataFiltrada, setDataFiltrada] = useState(null);

    const { entidad } = useParams();

    useEffect(() => {

        const getEntidad = async () => {
            const response = await getGeneral(entidad);
            setEntidades(response);
        }
        getEntidad();
    }, [entidad]);

    useEffect(() => {
        if (entidades && entidades.length > 0) {
            console.log("entidades", entidades);
            setAtributos(Object.keys(entidades[0]));
            setDataFiltrada(entidades);
        }
    }, [entidades]);

    const handleFilter = (filtro) => {
        setFiltro(filtro);
        if (entidades) {
            const newData = entidades.filter((elemento) => {
                return Object.values(elemento).some((valor) => {
                    return valor.toString().includes(filtro);
                });
            });

            setDataFiltrada(newData);
        }
    };

    return (
        <div>
            <h1>Tabla de {entidad}</h1>

            <input
                type="text"
                placeholder="Filtrar..."
                value={filtro}
                onChange={(e) => handleFilter(e.target.value)}
            />
            {!entidades || !atributos ? (<p>Cargando...</p>) : 
            (
                <table>
                    <thead>
                        <tr>
                            {atributos.map((atributo) => {
                                return <th key={atributo}>{atributo}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataFiltrada.map((elemento, index) => {
                            return (
                                <tr key={index}>
                                    {atributos.map((atributo) => {
                                        return <td key={atributo}>{elemento[atributo]}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TablaGeneral;