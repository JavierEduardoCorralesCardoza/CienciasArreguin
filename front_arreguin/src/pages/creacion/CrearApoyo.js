import React from 'react'
import postApoyo from '../../apis/post/postApoyo';

function CrearApoyo(){

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
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default CrearApoyo;