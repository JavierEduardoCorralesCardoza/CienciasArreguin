import React, {useState, useEffect} from "react";
import getByIdGeneral from "../../apis/getById/getByIdGeneral";


function PerfilAlumno(id){

    const [alumno, setAlumno] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getAlumno = async () => {
            const response = await getByIdGeneral(id, "alumnos");
            setAlumno(response);
        }
        getAlumno();
    }, []);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        console.log("Editando Alumno");
    };

    return(
        <div>
            <div>
                <h1>Perfil Alumno</h1>
                <button type="button" onClick={setIsModalOpen(!isModalOpen)}>Editar</button>
            </div>
            {isModalOpen && (
                <div>
                    <h3>Editar Alumno</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="alumnoCorreo">Correo del Alumno:</label>
                        <input type="text" id="alumnoCorreo" name="alumnoCorreo" value={alumno.correoAlumno}/>
                        <label htmlFor="alumnoContraseña">Contraseña del Alumno:</label>
                        <input type="text" id="alumnoContraseña" name="alumnoContraseña" value={alumno.contrasenaAlumno}/>
                        <label htmlFor="alumnoNombre">Nombre del Alumno:</label>
                        <input type="text" id="alumnoNombre" name="alumnoNombre" value={alumno.nombreAlumno}/>
                        <label htmlFor="alumnoFoto">Foto del Alumno:</label>
                        <input type="text" id="alumnoFoto" name="alumnoFoto" value={alumno.fotoAlumno}/>
                        <button type="submit">Editar</button>
                    </form>
                </div>
            )}
            <div>
                <h3>Información del Alumno</h3>
                <p>Correo: {alumno.correoAlumno}</p>
                <p>Contraseña: {alumno.contasenaAlumno}</p>
                <p>Nombre: {alumno.nombreAlumno}</p>
                <p>Foto: {alumno.fotoAlumno}</p>
            </div>
        </div>
    )
}

export default PerfilAlumno;