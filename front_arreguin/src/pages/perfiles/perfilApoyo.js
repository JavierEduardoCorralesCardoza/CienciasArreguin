import React, {useState, useEffect} from "react";
import getByIdGeneral from "../../apis/getById/getByIdGeneral";


function PerfilApoyo(id){

    const [apoyo, setApoyo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getApoyo = async () => {
            const response = await getByIdGeneral(id, "apoyos");
            setApoyo(response);
        }
        getApoyo();
    }, []);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        console.log("Editando apoyo");
    };

    return(
        <div>
            <div>
                <h1>Perfil Apoyo</h1>
                <button type="button" onClick={setIsModalOpen(!isModalOpen)}>Editar</button>
            </div>
            {isModalOpen && (
                <div>
                    <h3>Editar Apoyo</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="apoyoPatrocinador">Patrocinador del Apoyo:</label>
                        <input type="text" id="apoyoPatrocinador" name="apoyoPatrocinador" value={apoyo.patrocinadorApoyo}/>
                        <label htmlFor="apoyoDescripcion">Descripcion del Apoyo:</label>
                        <input type="text" id="apoyoDescripcion" name="apoyoDescripcion" value={apoyo.descripcionApoyo}/>
                        <button type="submit">Editar</button>
                    </form>
                </div>
            )}
            <div>
                <h3>Información del apoyo</h3>
                <p>Correo: {apoyo.correoapoyo}</p>
                <p>Contraseña: {apoyo.contasenaapoyo}</p>
                <p>Nombre: {apoyo.nombreapoyo}</p>
                <p>Foto: {apoyo.fotoapoyo}</p>
            </div>
        </div>
    )
}

export default PerfilApoyo;