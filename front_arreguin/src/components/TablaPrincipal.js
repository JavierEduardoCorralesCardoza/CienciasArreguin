import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import getGeneral from "../apis/get/getGeneral";
import { useAuth } from '../contexts/AuthContext';
import getByIdGeneral from "../apis/getById/getByIdGeneral";

// Hook para debounce
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function TablaPrincipal() {
  const [participaciones, setParticipaciones] = useState(null);
  const [alumnos, setAlumnos] = useState(null);
  const [asesores, setAsesores] = useState(null);
  const [eventos, setEventos] = useState(null);
  const [proyectos, setProyectos] = useState(null);
  const [apoyos, setApoyos] = useState(null);

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);

  const { currentUser, logout, isAdminUser, isAlumno, isAsesor } = useAuth();

  useEffect(() => {
    async function fetchData() {
      let p = [];
      if (isAdminUser) {
        p = await getGeneral("participaciones/detalle");
      }
      else {
        console.log(currentUser)
        p = await getByIdGeneral(currentUser.id, `participaciones/detalle/usuario`);
      }

      setParticipaciones(p);
      setAlumnos(await getGeneral("alumnos"));
      setAsesores(await getGeneral("asesores"));
      setEventos(await getGeneral("eventos"));
      setProyectos(await getGeneral("proyectos"));
      setApoyos(await getGeneral("apoyos"));
    }
    fetchData();
  }, []);

  // Función helper para encontrar el ID basado en el nombre
  const findIdByName = (entities, name, idField, nameField) => {
    if (!entities || !name) return null;
    const entity = entities.find(e => e[nameField] === name);
    return entity ? entity[idField] : null;
  };

  // Definir todas las columnas posibles
  const allColumns = useMemo(() => [
    {
      id: "idParticipacion",
      accessorKey: "idParticipacion",
      header: "ID de la Participación",
      cell: ({ row }) => (
        <Link 
          to={`/perfil/participacion/${row.original.idParticipacion}`}
          className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
        >
          {row.original.idParticipacion}
        </Link>
      ),
      filterFn: "equals",
      roles: ["admin"] // Solo admins pueden ver esta columna
    },
    {
      id: "nombreAlumno",
      accessorKey: "nombreAlumno",
      header: "Alumno",
      cell: ({ row }) => {
        const alumnoId = findIdByName(alumnos, row.original.nombreAlumno, 'idAlumno', 'nombreAlumno');
        return (
          <Link 
            to={`/perfil/alumno/${alumnoId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.nombreAlumno}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "asesor"] // Admins y asesores pueden ver esta columna
    },
    {
      id: "nombreAsesor",
      accessorKey: "nombreAsesor",
      header: "Asesor",
      cell: ({ row }) => {
        const asesorId = findIdByName(asesores, row.original.nombreAsesor, 'idAsesor', 'nombreAsesor');
        return (
          <Link 
            to={`/perfil/asesor/${asesorId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.nombreAsesor}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "alumno"] // Admins y alumnos pueden ver esta columna
    },
    {
      id: "nombreEvento",
      accessorKey: "nombreEvento",
      header: "Evento",
      cell: ({ row }) => {
        const eventoId = findIdByName(eventos, row.original.nombreEvento, 'idEvento', 'nombreEvento');
        return (
          <Link 
            to={`/perfil/evento/${eventoId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.nombreEvento}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "alumno", "asesor"] // Todos pueden ver esta columna
    },
    {
      id: "nombreProyecto",
      accessorKey: "nombreProyecto",
      header: "Proyecto",
      cell: ({ row }) => {
        const proyectoId = findIdByName(proyectos, row.original.nombreProyecto, 'idProyecto', 'nombreProyecto');
        return (
          <Link 
            to={`/perfil/proyecto/${proyectoId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.nombreProyecto}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "alumno", "asesor"] // Todos pueden ver esta columna
    },
    {
      id: "categoriaProyecto",
      accessorKey: "categoriaProyecto",
      header: "Categoría",
      filterFn: "includesString",
      roles: ["admin", "asesor"] // Solo admins y asesores pueden ver esta columna
    },
    {
      id: "descripcionApoyoAlumno",
      accessorKey: "descripcionApoyoAlumno",
      header: "Apoyo al Alumno",
      cell: ({ row }) => {
        if (!row.original.descripcionApoyoAlumno) {
          return <span className="text-gray-500 italic">Sin apoyo</span>;
        }
        const apoyoId = findIdByName(apoyos, row.original.descripcionApoyoAlumno, 'idApoyo', 'descripcionApoyo');
        return (
          <Link 
            to={`/perfil/apoyo/${apoyoId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.descripcionApoyoAlumno}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "alumno"] // Admins y alumnos pueden ver esta columna
    },
    {
      id: "descripcionApoyoAsesor",
      accessorKey: "descripcionApoyoAsesor",
      header: "Apoyo al Asesor",
      cell: ({ row }) => {
        if (!row.original.descripcionApoyoAsesor) {
          return <span className="text-gray-500 italic">Sin apoyo</span>;
        }
        const apoyoId = findIdByName(apoyos, row.original.descripcionApoyoAsesor, 'idApoyo', 'descripcionApoyo');
        return (
          <Link 
            to={`/perfil/apoyo/${apoyoId || '#'}`}
            className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium"
          >
            {row.original.descripcionApoyoAsesor}
          </Link>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "asesor"] // Admins y asesores pueden ver esta columna
    },
    {
      id: "fechaEvento",
      accessorKey: "fechaEvento",
      header: "Fecha del Evento",
      cell: ({ row }) => {
        const fecha = row.original.fechaEvento;
        return fecha ? (
          <span className="text-sm">{new Date(fecha).toLocaleDateString()}</span>
        ) : (
          <span className="text-gray-500 italic">Sin fecha</span>
        );
      },
      filterFn: "includesString",
      roles: ["admin", "alumno", "asesor"] // Todos pueden ver esta columna
    },
  ], [alumnos, asesores, eventos, proyectos, apoyos]);

  // Filtrar columnas según el rol del usuario
  const columns = useMemo(() => {
    let userRole;
    if (isAdminUser) userRole = "admin";
    else if (isAlumno) userRole = "alumno";
    else if (isAsesor) userRole = "asesor";
    else userRole = "guest";

    return allColumns.filter(column => 
      column.roles.includes(userRole)
    );
  }, [allColumns, isAdminUser, isAlumno, isAsesor]);

  const table = useReactTable({
    data: participaciones || [],
    columns,
    state: {
      columnFilters,
      sorting,
      pagination,
      globalFilter: debouncedGlobalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Componente select con búsqueda interna
  function SelectFilter({ column, options, label, valueKey = "id", textKey = "name" }) {
    const [search, setSearch] = useState("");
    const value = column?.getFilterValue() || "";

    const filteredOptions = options.filter(opt =>
      opt[textKey].toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}:
        </label>
        <select
          value={value}
          onChange={(e) => column?.setFilterValue(e.target.value || undefined)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Todos</option>
          {filteredOptions.map((opt) => (
            <option key={opt[valueKey]} value={String(opt[valueKey])}>
              {opt[textKey]}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (
    !participaciones ||
    !alumnos ||
    !asesores ||
    !eventos ||
    !proyectos ||
    !apoyos
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          <span className="text-lg text-gray-600">Cargando tabla...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Tabla Principal</h1>
      </div>

      <div className="p-6">
        {/* Búsqueda global */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Búsqueda Global
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar en toda la tabla..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Filtros select con búsqueda - Solo mostrar filtros para columnas visibles */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {table.getColumn("nombreAlumno") && (
            <SelectFilter
              column={table.getColumn("nombreAlumno")}
              options={alumnos}
              label="Filtro Alumno"
              valueKey="idAlumno"
              textKey="nombreAlumno"
            />
          )}
          {table.getColumn("nombreAsesor") && (
            <SelectFilter
              column={table.getColumn("nombreAsesor")}
              options={asesores}
              label="Filtro Asesor"
              valueKey="idAsesor"
              textKey="nombreAsesor"
            />
          )}
          {table.getColumn("nombreEvento") && (
            <SelectFilter
              column={table.getColumn("nombreEvento")}
              options={eventos}
              label="Filtro Evento"
              valueKey="idEvento"
              textKey="nombreEvento"
            />
          )}
          {table.getColumn("nombreProyecto") && (
            <SelectFilter
              column={table.getColumn("nombreProyecto")}
              options={proyectos}
              label="Filtro Proyecto"
              valueKey="idProyecto"
              textKey="nombreProyecto"
            />
          )}
          {table.getColumn("descripcionApoyoAlumno") && (
            <SelectFilter
              column={table.getColumn("descripcionApoyoAlumno")}
              options={apoyos}
              label="Filtro Apoyo Alumno"
              valueKey="idApoyo"
              textKey="descripcionApoyo"
            />
          )}
          {table.getColumn("descripcionApoyoAsesor") && (
            <SelectFilter
              column={table.getColumn("descripcionApoyoAsesor")}
              options={apoyos}
              label="Filtro Apoyo Asesor"
              valueKey="idApoyo"
              textKey="descripcionApoyo"
            />
          )}
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-1">
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        <span className="text-gray-400">
                          {{
                            asc: (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                            ),
                            desc: (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            ),
                          }[header.column.getIsSorted()] ?? (
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-50" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
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

        {/* Información de filas y navegación */}
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
      </div>
    </div>
  );
}

export default TablaPrincipal;