import React, { useEffect, useState } from "react";
import postParticipacion from "../../apis/post/postParticipacion";
import getGeneral from "../../apis/get/getGeneral";

function CrearParticipacion() {
  const [opciones, setOpciones] = useState({
    alumnos: [],
    asesores: [],
    eventos: [],
    proyectos: [],
    apoyos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    alumnoParticipacionId: "",
    asesorParticipacionId: "",
    eventoParticipacionId: "",
    proyectoParticipacionId: "",
    apoyoAlumnoParticipacionId: "",
    apoyoAsesorParticipacionId: "",
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [alumnos, asesores, eventos, proyectos, apoyos] = await Promise.all([
          getGeneral("alumnos"),
          getGeneral("asesores"),
          getGeneral("eventos"),
          getGeneral("proyectos"),
          getGeneral("apoyos"),
        ]);
        setOpciones({ alumnos, asesores, eventos, proyectos, apoyos });
      } catch (e) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postParticipacion(formData);
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Crear Participacion</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="alumnoParticipacionId">Alumno:</label>
        <select
          id="alumnoParticipacionId"
          name="alumnoParticipacionId"
          value={formData.alumnoParticipacionId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecciona un alumno
          </option>
          {opciones.alumnos.map((alumno) => (
            <option key={alumno.idAlumno} value={alumno.idAlumno}>
              {alumno.nombreAlumno}
            </option>
          ))}
        </select>

        <label htmlFor="asesorParticipacionId">Asesor:</label>
        <select
          id="asesorParticipacionId"
          name="asesorParticipacionId"
          value={formData.asesorParticipacionId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecciona un asesor
          </option>
          {opciones.asesores.map((asesor) => (
            <option key={asesor.idAsesor} value={asesor.idAsesor}>
              {asesor.nombreAsesor}
            </option>
          ))}
        </select>

        <label htmlFor="eventoParticipacionId">Evento:</label>
        <select
          id="eventoParticipacionId"
          name="eventoParticipacionId"
          value={formData.eventoParticipacionId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecciona un evento
          </option>
          {opciones.eventos.map((evento) => (
            <option key={evento.idEvento} value={evento.idEvento}>
              {evento.nombreEvento}
            </option>
          ))}
        </select>

        <label htmlFor="proyectoParticipacionId">Proyecto:</label>
        <select
          id="proyectoParticipacionId"
          name="proyectoParticipacionId"
          value={formData.proyectoParticipacionId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecciona un proyecto
          </option>
          {opciones.proyectos.map((proyecto) => (
            <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
              {proyecto.nombreProyecto}
            </option>
          ))}
        </select>

        <label htmlFor="apoyoAlumnoParticipacionId">Apoyo Alumno:</label>
        <select
          id="apoyoAlumnoParticipacionId"
          name="apoyoAlumnoParticipacionId"
          value={formData.apoyoAlumnoParticipacionId}
          onChange={handleChange}
        >
          <option value="">
            Selecciona un apoyo
          </option>
          {opciones.apoyos.map((apoyoItem) => (
            <option key={apoyoItem.idApoyo} value={apoyoItem.idApoyo}>
              {apoyoItem.descripcionApoyo}
            </option>
          ))}
        </select>

        <label htmlFor="apoyoAsesorParticipacionId">Apoyo Asesor:</label>
        <select
          id="apoyoAsesorParticipacionId"
          name="apoyoAsesorParticipacionId"
          value={formData.apoyoAsesorParticipacionId}
          onChange={handleChange}
        >
          <option value="">
            Selecciona un apoyo
          </option>
          {opciones.apoyos.map((apoyoItem) => (
            <option key={apoyoItem.idApoyo} value={apoyoItem.idApoyo}>
              {apoyoItem.descripcionApoyo}
            </option>
          ))}
        </select>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CrearParticipacion;