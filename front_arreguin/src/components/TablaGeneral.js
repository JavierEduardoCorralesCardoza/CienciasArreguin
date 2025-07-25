import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link, useParams } from "react-router-dom";
import getGeneral from "../apis/get/getGeneral";
import { BackButton } from "./ui/FormComponents";

const traduccion = {
    alumnos: "alumno",
    asesores: "asesor",
    eventos: "evento",
    proyectos: "proyecto",
    apoyos: "apoyo",
};

function TablaGeneral() {
  const { entidad } = useParams();

  const [entidades, setEntidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGeneral(entidad)
      .then((response) => {
        // Ensure we always set an array, even if response is null
        setEntidades(response || []);
      })
      .catch(() => {
        setError("Error al cargar datos");
        setEntidades([]); // Set empty array on error
      })
      .finally(() => setLoading(false));
  }, [entidad]);

  useEffect(() => {
    setFiltroGlobal("");
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [entidad]);

  // Add null/undefined check for entidades
  const idKey = useMemo(() => {
    if (!entidades || !Array.isArray(entidades) || entidades.length === 0) {
      return null;
    }
    return Object.keys(entidades[0])[0];
  }, [entidades]);

  const columns = useMemo(() => {
    // Add comprehensive checks
    if (!entidades || !Array.isArray(entidades) || entidades.length === 0 || !idKey) {
      return [];
    }

    return Object.keys(entidades[0]).map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      cell: ({ row, getValue }) => {
        const id = row.original[idKey];
        return (
          <Link 
            to={`/perfil/${traduccion[entidad]}/${id}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium transition-colors duration-150"
          >
            {getValue()}
          </Link>
        );
      },
    }));
  }, [entidades, entidad, idKey]);

  const table = useReactTable({
    data: entidades || [], // Ensure data is always an array
    columns,
    state: {
      sorting,
      globalFilter: filtroGlobal,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltroGlobal,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              Tabla de {entidad}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
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

            {/* Empty State */}
            {!loading && !error && (!entidades || entidades.length === 0) && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay datos</h3>
                <p className="mt-1 text-sm text-gray-500">No hay datos para mostrar en esta tabla.</p>
              </div>
            )}
            {/* Back Button */}
            <div className="mb-6 max-w-md">
              <BackButton>
                ← Regresar
              </BackButton>
            </div>
            {/* Content */}
            {!loading && !error && entidades && entidades.length > 0 && (
              <>
                {/* Search Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Búsqueda
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Filtrar datos..."
                      value={filtroGlobal}
                      onChange={(e) => setFiltroGlobal(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            const isSorted = header.column.getIsSorted();
                            return (
                              <th
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                aria-sort={
                                  isSorted === "asc" ? "ascending" : isSorted === "desc" ? "descending" : "none"
                                }
                                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-150"
                              >
                                <div className="flex items-center space-x-1">
                                  <span>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                  </span>
                                  <span className="text-gray-400">
                                    {isSorted === "asc" ? (
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                      </svg>
                                    ) : isSorted === "desc" ? (
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      ))}
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {table.getRowModel().rows.map((row, index) => (
                        <tr 
                          key={row.id}
                          className={`hover:bg-gray-50 transition-colors duration-150 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td 
                              key={cell.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando{' '}
                    <span className="font-medium">
                      {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                    </span>{' '}
                    a{' '}
                    <span className="font-medium">
                      {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                      )}
                    </span>{' '}
                    de{' '}
                    <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>{' '}
                    resultados
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => table.previousPage()} 
                      disabled={!table.getCanPreviousPage()}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Anterior
                    </button>
                    
                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                      Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </span>
                    
                    <button 
                      onClick={() => table.nextPage()} 
                      disabled={!table.getCanNextPage()}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                    >
                      Siguiente
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablaGeneral;