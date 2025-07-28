import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import estructura_clases from "../../utils/estructura_clases";
import getByIdGeneral from "../../apis/getById/getByIdGeneral";
import putGeneral from "../../apis/put/putGeneral";
import putParticipacion from "../../apis/put/putParticipacion";
import deleteGeneral from "../../apis/delete/deleteGeneral";
import { BackButton, FileInput } from "../../components/ui/FormComponents";
import { useAuth } from '../../contexts/AuthContext';

function PerfilGeneral() {
  const { entidad, id } = useParams();
  const [data, setData] = useState(null);
  const [edicion, setEdicion] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAlumno } = useAuth();

  const atributos = entidad ? Object.keys(estructura_clases.entidades[entidad].atributos) : [];

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
    try {
      // Usar putParticipacion para participacion, putGeneral para el resto
      if (entidad === 'participacion') {
        await putParticipacion(event, id);
      } else {
        await putGeneral(entidad, event, id, data);
      }
      
      // Recargar datos
      const response = await getByIdGeneral(id, estructura_clases.entidades[entidad].plural);
      setData(response);
      setEdicion(response);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleInputChange = (event) => {
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
  };

  const getInputType = (tipo) => {
    const types = { string: "text", number: "number", date: "date", text: "text" };
    return types[tipo] || "text";
  };

  const isImageField = (atributo) => atributo.toLowerCase().includes('imagen');

  const shouldUseFileInput = (atributo) => 
    (entidad === 'asesor' || entidad === 'alumno') && isImageField(atributo);

  const renderValue = (valor, atributo) => {
    // Si es un campo de imagen y tiene valor, mostrar preview
    if (isImageField(atributo) && valor) {
      const imageUrl = `http://localhost:8080/uploads/${valor}`;
      return (
        <div className="flex flex-col space-y-3">
          <div className="relative inline-block">
            <img 
              src={imageUrl} 
              alt={`${atributo} preview`}
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback en caso de error de carga */}
            <div 
              className="w-32 h-32 bg-gray-100 rounded-lg border border-gray-200 items-center justify-center text-gray-400 text-sm hidden"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Error al cargar imagen
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Archivo:</span> {valor}
          </div>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver imagen completa
          </a>
        </div>
      );
    }

    // Si es un objeto, renderizar como antes
    if (typeof valor === "object" && valor !== null) {
      return (
        <div className="bg-gray-50 rounded p-3">
          {Object.entries(valor).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span>{String(val)}</span>
            </div>
          ))}
        </div>
      );
    }

    // Valor normal
    return <span>{valor || 'No especificado'}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold capitalize">Perfil de {entidad}</h1>
            {!isAlumno && (
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {isModalOpen ? "Cerrar" : "Editar"}
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Modal de Edición */}
        {isModalOpen && (
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold capitalize">Editar {entidad}</h2>
            </div>
            <div className="px-6 py-6">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {atributos.map((atributo) => (
                    <div key={atributo} className={shouldUseFileInput(atributo) ? "md:col-span-2" : ""}>
                      {shouldUseFileInput(atributo) ? (
                        <FileInput
                          label={atributo.charAt(0).toUpperCase() + atributo.slice(1)}
                          id={atributo}
                          name={atributo}
                          accept="image/*"
                          placeholder="Selecciona una imagen"
                        />
                      ) : (
                        <>
                          <label className="block text-sm font-medium mb-1 capitalize">
                            {atributo}
                          </label>
                          <input
                            type={getInputType(estructura_clases.entidades[entidad].atributos[atributo]?.tipo)}
                            name={atributo}
                            value={edicion[atributo] || ""}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4 border-t">
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Botón Regresar */}
        <div className="mb-6">
          <BackButton>← Regresar</BackButton>
        </div>
        
        {/* Información */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold capitalize">Información del {entidad}</h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {atributos
                .filter((atributo) => !atributo.includes("contrasena"))
                .map((atributo) => (
                  <div 
                    key={atributo} 
                    className={`border-b border-gray-100 pb-4 ${isImageField(atributo) ? 'lg:col-span-2' : ''}`}
                  >
                    <dt className="text-sm font-medium text-gray-500 capitalize mb-2">
                      {atributo}
                    </dt>
                    <dd>{renderValue(data[atributo], atributo)}</dd>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilGeneral;