import React, {useEffect, useState} from "react";

function TablaPrincipal() {

    const [eventos, setEventos] = useState(null);

    useEffect(() => {

        const getEventos = async () => {
            const eventos = await getGeneral("eventos");
            setEventos(eventos);
        };

        const getData = async () => {
            const response = await fetch("http://localhost:8080/");
            const data = await response.json();
            setData(data);
        };

        getData();

    }, []);

    return (
        <div>
            <h1>Tabla Principal</h1>
        </div>
    );
}

export default TablaPrincipal;