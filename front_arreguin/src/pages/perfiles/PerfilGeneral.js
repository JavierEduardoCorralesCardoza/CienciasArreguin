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
import { BackButton } from "../../components/ui/FormComponents";
import { useAuth } from '../../contexts/AuthContext';

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

  const { 
    isAlumno
  } = useAuth();

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
        
      } catch (caughtError) {
        console.error('Error capturado en handleEditSubmit:', caughtError);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              Perfil de {entidad}
            </h1>
            {!isAlumno && (
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen((prev) => !prev)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {isModalOpen ? "Cerrar" : "Editar"}
                </button>
                <button 
                  type="button" 
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="text-lg text-gray-600">Cargando...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isModalOpen && !loading && !error && (
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                Editar {entidad}
              </h2>
            </div>
            <div className="px-6 py-6">
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {atributos.map((atributo) => (
                    <div key={atributo}>
                      <label 
                        htmlFor={atributo}
                        className="block text-sm font-medium text-gray-700 mb-2 capitalize"
                      >
                        {atributo}
                      </label>
                      <input
                        type={getInputType(estructura_clases.entidades[entidad].atributos[atributo].tipo)}
                        id={atributo}
                        name={atributo}
                        value={atributo !== "contrasenaAlumno" && atributo !== "contrasenaAsesor" ? edicion[atributo] : ""}
                        onChange={handleInputEdicion}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button 
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Back Button */}
        <div className="mb-6 max-w-md">
          <BackButton>
            ← Regresar
          </BackButton>
        </div>
        {/* Information Display */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                Información del {entidad}
              </h2>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {atributos.filter((atributo) => !(atributo === "contrasenaAlumno" || atributo === "contrasenaAsesor")).map((atributo) => {
                  const valor = data[atributo];
                  return (
                    <div key={atributo} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <dt className="text-sm font-medium text-gray-500 capitalize mb-2">
                        {atributo}
                      </dt>
                      <dd className="mt-1">
                        {typeof valor === "object" && valor !== null ? (
                          <div className="bg-gray-50 rounded-lg p-4 border">
                            <ul className="space-y-2">
                              {Object.entries(valor).map(([subKey, subVal]) => (
                                <li key={subKey} className="flex justify-between items-start">
                                  <span className="text-sm font-medium text-gray-600 capitalize">
                                    {subKey}:
                                  </span>
                                  <span className="text-sm text-gray-900 ml-4 text-right">
                                    {String(subVal)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {valor || 'No especificado'}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilGeneral;