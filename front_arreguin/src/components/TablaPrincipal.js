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

  useEffect(() => {
    async function fetchData() {
      const p = await getGeneral("participaciones/detalle");
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

  const columns = useMemo(() => [
    {
      accessorKey: "idParticipacion",
      header: "ID de la Participación",
      cell: ({ row }) => (
        <Link to={`/perfil/participacion/${row.original.idParticipacion}`}>
          {row.original.idParticipacion}
        </Link>
      ),
      filterFn: "equals",
    },
    {
      accessorKey: "nombreAlumno",
      header: "Alumno",
      cell: ({ row }) => {
        const alumnoId = findIdByName(alumnos, row.original.nombreAlumno, 'idAlumno', 'nombreAlumno');
        return (
          <Link to={`/perfil/alumno/${alumnoId || '#'}`}>
            {row.original.nombreAlumno}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "nombreAsesor",
      header: "Asesor",
      cell: ({ row }) => {
        const asesorId = findIdByName(asesores, row.original.nombreAsesor, 'idAsesor', 'nombreAsesor');
        return (
          <Link to={`/perfil/asesor/${asesorId || '#'}`}>
            {row.original.nombreAsesor}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "nombreEvento",
      header: "Evento",
      cell: ({ row }) => {
        const eventoId = findIdByName(eventos, row.original.nombreEvento, 'idEvento', 'nombreEvento');
        return (
          <Link to={`/perfil/evento/${eventoId || '#'}`}>
            {row.original.nombreEvento}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "nombreProyecto",
      header: "Proyecto",
      cell: ({ row }) => {
        const proyectoId = findIdByName(proyectos, row.original.nombreProyecto, 'idProyecto', 'nombreProyecto');
        return (
          <Link to={`/perfil/proyecto/${proyectoId || '#'}`}>
            {row.original.nombreProyecto}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "categoriaProyecto",
      header: "Categoría",
      filterFn: "includesString",
    },
    {
      accessorKey: "descripcionApoyoAlumno",
      header: "Apoyo al Alumno",
      cell: ({ row }) => {
        if (!row.original.descripcionApoyoAlumno) {
          return "Sin apoyo";
        }
        const apoyoId = findIdByName(apoyos, row.original.descripcionApoyoAlumno, 'idApoyo', 'descripcionApoyo');
        return (
          <Link to={`/perfil/apoyo/${apoyoId || '#'}`}>
            {row.original.descripcionApoyoAlumno}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "descripcionApoyoAsesor",
      header: "Apoyo al Asesor",
      cell: ({ row }) => {
        if (!row.original.descripcionApoyoAsesor) {
          return "Sin apoyo";
        }
        const apoyoId = findIdByName(apoyos, row.original.descripcionApoyoAsesor, 'idApoyo', 'descripcionApoyo');
        return (
          <Link to={`/perfil/apoyo/${apoyoId || '#'}`}>
            {row.original.descripcionApoyoAsesor}
          </Link>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "fechaEvento",
      header: "Fecha del Evento",
      cell: ({ row }) => {
        const fecha = row.original.fechaEvento;
        return fecha ? new Date(fecha).toLocaleDateString() : "Sin fecha";
      },
      filterFn: "includesString",
    },
  ], [alumnos, asesores, eventos, proyectos, apoyos]); // Agregamos las dependencias

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
      <label style={{ marginRight: 10 }}>
        {label}:
        <input
          type="text"
          placeholder={`Buscar ${label.toLowerCase()}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft: 5, marginRight: 5 }}
        />
        <select
          value={value}
          onChange={(e) => column?.setFilterValue(e.target.value || undefined)}
        >
          <option value="">Todos</option>
          {filteredOptions.map((opt) => (
            <option key={opt[valueKey]} value={String(opt[valueKey])}>
              {opt[textKey]}
            </option>
          ))}
        </select>
      </label>
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
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Tabla Principal</h1>

      {/* Búsqueda global */}
      <input
        type="text"
        placeholder="Buscar en toda la tabla..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />

      {/* Filtros select con búsqueda */}
      <form style={{ marginBottom: "1rem" }}>
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
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ 
                    cursor: "pointer", 
                    userSelect: "none",
                    border: "1px solid #ccc",
                    padding: "8px",
                    backgroundColor: "#f5f5f5"
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td 
                  key={cell.id}
                  style={{ 
                    border: "1px solid #ccc",
                    padding: "8px"
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </button>
        <span style={{ margin: "0 1rem" }}>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default TablaPrincipal;