import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import estructura_clases from "../../utils/estructura_clases";
import getByIdGeneral from "../../apis/getById/getByIdGeneral";
import putAlumno from "../../apis/put/putAlumno";
import putAsesor from "../../apis/put/putAsesor";
import putEvento from "../../apis/put/putEvento";
import putProyecto from "../../apis/put/putProyecto";
import putApoyo from "../../apis/put/putApoyo";
import deleteGeneral from "../../apis/delete/deleteGeneral";  

const putFunctions = {
  alumno: putAlumno,
  asesor: putAsesor,
  evento: putEvento,
  proyecto: putProyecto,
  apoyo: putApoyo,
};

const getInputType = (tipo) => {
  switch (tipo) {
    case "string":
      return "text";
    case "number":
    case "text":
    case "date":
      return tipo;
    default:
      return "text";
  }
};

function PerfilGeneral() {
  const { entidad, id } = useParams();
  const [data, setData] = useState(null);
  const [edicion, setEdicion] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const atributos = entidad
    ? Object.keys(estructura_clases.entidades[entidad].atributos)
    : [];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getByIdGeneral(id, estructura_clases.entidades[entidad].plural);
        setData(response);
        setEdicion(response);
        setError(null);
      } catch (e) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    }

    if (id && entidad) fetchData();
  }, [id, entidad]);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (putFunctions[entidad]) {
      try {
        await putFunctions[entidad](event, id);
        const response = await getByIdGeneral(id, estructura_clases.entidades[entidad].plural);
        setData(response);
        setEdicion(response);
        setIsModalOpen(false);
      } catch {
        alert("Error al guardar cambios");
      }
    }
  };

  const handleInputEdicion = (event) => {
    const { name, value } = event.target;
    setEdicion((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${entidad}?`)) {
      try {
        await deleteGeneral(`${estructura_clases.entidades[entidad].plural}/${id}`);
        window.history.back();
      } catch (e) {
        alert("Error al eliminar el registro");
      }
    }
  }

  return (
    <div>
      <header>
        <h1>Perfil de {entidad}</h1>
        <button type="button" onClick={() => setIsModalOpen((prev) => !prev)}>
          {isModalOpen ? "Cerrar" : "Editar"}
        </button>
        <button type="button" onClick={handleDelete}>
          Eliminar
        </button>
      </header>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isModalOpen && !loading && !error && (
        <section aria-label={`Editar ${entidad}`}>
          <h2>Editar {entidad}</h2>
          <form onSubmit={handleEditSubmit}>
            {atributos.map((atributo) => (
              <div key={atributo}>
                <label htmlFor={atributo}>{atributo}</label>
                <input
                  type={getInputType(estructura_clases.entidades[entidad].atributos[atributo].tipo)}
                  id={atributo}
                  name={atributo}
                  value={edicion[atributo] || ""}
                  onChange={handleInputEdicion}
                />
              </div>
            ))}
            <button type="submit">Guardar Cambios</button>
          </form>
        </section>
      )}

      {!loading && !error && (
        <section aria-label={`Información de ${entidad}`}>
          <h2>Información del {entidad}</h2>
          {atributos.map((atributo) => {
            const valor = data[atributo];
            return (
              <div key={atributo} style={{ marginBottom: "1rem" }}>
                <strong>{atributo}:</strong>{" "}
                {typeof valor === "object" && valor !== null ? (
                  <ul style={{ marginLeft: "1rem", backgroundColor: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
                    {Object.entries(valor).map(([subKey, subVal]) => (
                      <li key={subKey}>
                        <strong>{subKey}:</strong> {String(subVal)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>{valor}</span>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default PerfilGeneral;
