import React, { useEffect, useState } from "react";
import postParticipacion from "../../apis/post/postParticipacion";
import getGeneral from "../../apis/get/getGeneral";
import { 
  FormContainer, 
  Form, 
  SelectField, 
  SubmitButton, 
  LoadingState, 
  ErrorState,
  BackButton
} from "../../components/ui/FormComponents";

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

  // ✅ Función handleSubmit modificada para incluir el alert
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postParticipacion(formData);
      alert("Participación creada exitosamente!"); // ✅ Alert agregado
    } catch (error) {
      setError(error.message || "No se pudo crear la participación");
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 max-w-md mx-auto">
          <BackButton>
            ← Regresar
          </BackButton>
        </div>
        
        <FormContainer title="Crear Participacion">
          <Form onSubmit={handleSubmit}>
            <SelectField
              label="Alumno:"
              id="alumnoParticipacionId"
              name="alumnoParticipacionId"
              value={formData.alumnoParticipacionId}
              onChange={handleChange}
              required
              placeholder="Selecciona un alumno"
            >
              {opciones.alumnos.map((alumno) => (
                <option key={alumno.idAlumno} value={alumno.idAlumno}>
                  {alumno.nombreAlumno}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Asesor:"
              id="asesorParticipacionId"
              name="asesorParticipacionId"
              value={formData.asesorParticipacionId}
              onChange={handleChange}
              required
              placeholder="Selecciona un asesor"
            >
              {opciones.asesores.map((asesor) => (
                <option key={asesor.idAsesor} value={asesor.idAsesor}>
                  {asesor.nombreAsesor}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Evento:"
              id="eventoParticipacionId"
              name="eventoParticipacionId"
              value={formData.eventoParticipacionId}
              onChange={handleChange}
              required
              placeholder="Selecciona un evento"
            >
              {opciones.eventos.map((evento) => (
                <option key={evento.idEvento} value={evento.idEvento}>
                  {evento.nombreEvento}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Proyecto:"
              id="proyectoParticipacionId"
              name="proyectoParticipacionId"
              value={formData.proyectoParticipacionId}
              onChange={handleChange}
              required
              placeholder="Selecciona un proyecto"
            >
              {opciones.proyectos.map((proyecto) => (
                <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                  {proyecto.nombreProyecto}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Apoyo Alumno:"
              id="apoyoAlumnoParticipacionId"
              name="apoyoAlumnoParticipacionId"
              value={formData.apoyoAlumnoParticipacionId}
              onChange={handleChange}
              placeholder="Selecciona un apoyo"
            >
              {opciones.apoyos.map((apoyoItem) => (
                <option key={apoyoItem.idApoyo} value={apoyoItem.idApoyo}>
                  {apoyoItem.descripcionApoyo}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Apoyo Asesor:"
              id="apoyoAsesorParticipacionId"
              name="apoyoAsesorParticipacionId"
              value={formData.apoyoAsesorParticipacionId}
              onChange={handleChange}
              placeholder="Selecciona un apoyo"
            >
              {opciones.apoyos.map((apoyoItem) => (
                <option key={apoyoItem.idApoyo} value={apoyoItem.idApoyo}>
                  {apoyoItem.descripcionApoyo}
                </option>
              ))}
            </SelectField>

            {/* ✅ Botón con estado de loading */}
            <SubmitButton>
              Crear Participación
            </SubmitButton>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
}

export default CrearParticipacion;