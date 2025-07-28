import React, { useState } from "react";
import { useParams } from "react-router-dom";
import estructura_clases from "../../utils/estructura_clases";
import postAlumno from "../../apis/post/postAlumno";
import postAsesor from "../../apis/post/postAsesor";
import postEvento from "../../apis/post/postEvento";
import postProyecto from "../../apis/post/postProyecto";
import postApoyo from "../../apis/post/postApoyo";
import { 
  FormContainer, 
  Form, 
  InputField, 
  FileInput, 
  SubmitButton, 
  BackButton,
  LoadingState,
  ErrorState 
} from "../../components/ui/FormComponents";

const postFunctions = {
  alumno: postAlumno,
  asesor: postAsesor,
  evento: postEvento,
  proyecto: postProyecto,
  apoyo: postApoyo,
};

function CrearGeneral() {
  const { entidad } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!entidad || entidad === 'participacion' || !estructura_clases.entidades[entidad]) {
    return <ErrorState message="Entidad no válida o no permitida" />;
  }

  const atributos = Object.keys(estructura_clases.entidades[entidad].atributos);
  const tituloEntidad = entidad.charAt(0).toUpperCase() + entidad.slice(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postFunction = postFunctions[entidad];
      if (!postFunction) {
        throw new Error(`No se encontró función POST para ${entidad}`);
      }

      await postFunction(event);
      alert(`${tituloEntidad} creado exitosamente!`);
    } catch (error) {
      setError(error.message || `No se pudo crear el ${entidad}`);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (atributo) => {
    const atributoConfig = estructura_clases.entidades[entidad].atributos[atributo];
    const fieldName = atributoConfig.fieldName || atributo;
    const fieldLabel = atributoConfig.label || atributo.charAt(0).toUpperCase() + atributo.slice(1);
    
    const isImage = atributo.includes("imagen");
    const isPassword = atributo.includes("contrasena");
    const isEmail = atributo.includes("correo");
    
    let inputType = "text";
    if (isEmail) inputType = "email";
    else if (isPassword) inputType = "password";
    else if (atributoConfig.tipo === "date") inputType = "date";
    else if (atributoConfig.tipo === "number") inputType = "number";

    if (isImage) {
      return (
        <FileInput
          key={atributo}
          label={fieldLabel + ":"}
          id={fieldName}
          name={fieldName}
          required={atributoConfig.requerido}
        />
      );
    }

    return (
      <InputField
        key={atributo}
        label={fieldLabel + ":"}
        type={inputType}
        id={fieldName}
        name={fieldName}
        required={atributoConfig.requerido}
      />
    );
  };

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 max-w-md mx-auto">
          <BackButton>← Regresar</BackButton>
        </div>
        
        {error && (
          <div className="max-w-md mx-auto mb-6">
            <ErrorState message={error} />
          </div>
        )}
        
        <FormContainer title={`Crear ${tituloEntidad}`}>
          <Form onSubmit={handleSubmit}>
            {atributos.map(renderField)}
            <SubmitButton disabled={loading}>
              {loading ? `Creando ${tituloEntidad}...` : `Crear ${tituloEntidad}`}
            </SubmitButton>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
}

export default CrearGeneral;