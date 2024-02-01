import React from "react";
import { TableCell, TableRow } from "components/table";

export default function ProductFilterRow({ filters, setFilters }) {
  const { isAsc } = filters;

  const toggleOrder = () => {
    setFilters({ ...filters, isAsc: !filters.isAsc });
  };

  return (
    <TableRow>
      <TableCell className="w-1/5"></TableCell>
      <TableCell className="w-1/5">
        <button
          onClick={toggleOrder}
          className="rounded-md bg-blue-200 px-3 py-1 duration-300 hover:bg-blue-300"
        >
          {isAsc ? "Asc" : "Desc"}
        </button>
      </TableCell>
      <TableCell className="w-1/5"></TableCell>
      <TableCell className="w-1/5"></TableCell>
      <TableCell className="w-1/5"></TableCell>
    </TableRow>
  );
}
