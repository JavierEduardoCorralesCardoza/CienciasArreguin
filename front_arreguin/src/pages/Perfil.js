import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Perfil() {

    const [data, setData] = useState(null);
    const id = 1; // Replace with the actual id you want to use

    useEffect(() => {
        fetch(`http://localhost:8080/alumno_por_evento/busqueda?id=${id}`) // Replace with the actual endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [id]);
    
    return (
        <div>
            <h1>Perfil</h1>
            <Link to="/crear_evento">Crear Evento</Link>
            <br />
            <Link to="/crear_proyecto">Crear Proyecto</Link>
            <br />
            <Link to="/crear_asesor">Crear Asesor</Link>
            <br />
            <Link to="/crear_alumno">Crear Alumno</Link>

            {data && (
                <div>
                    <h2>Información del Alumno</h2>
                    <p>Nombre: {data}</p>

                </div>
            )}
        </div>
    );
}

export default Perfil;