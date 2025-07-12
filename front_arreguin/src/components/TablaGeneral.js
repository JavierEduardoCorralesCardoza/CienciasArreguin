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
      .then((response) => setEntidades(response))
      .catch(() => setError("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, [entidad]);

  useEffect(() => {
    setFiltroGlobal("");
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [entidad]);

  const idKey = useMemo(() => (entidades.length ? Object.keys(entidades[0])[0] : null), [entidades]);

  const columns = useMemo(() => {
    if (entidades.length === 0 || !idKey) return [];

    return Object.keys(entidades[0]).map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      cell: ({ row, getValue }) => {
        const id = row.original[idKey];
        return (
          <Link to={`/perfil/${traduccion[entidad]}/${id}`}>
            {getValue()}
          </Link>
        );
      },
    }));
  }, [entidades, entidad, idKey]);

  const table = useReactTable({
    data: entidades,
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (entidades.length === 0) return <p>No hay datos para mostrar</p>;

  return (
    <div>
      <h1>Tabla de {entidad}</h1>
      <input
        type="text"
        placeholder="Filtrar..."
        value={filtroGlobal}
        onChange={(e) => setFiltroGlobal(e.target.value)}
      />

      <table>
        <thead>
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
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSorted === "asc" ? " 🔼" : isSorted === "desc" ? " 🔽" : ""}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default TablaGeneral;
