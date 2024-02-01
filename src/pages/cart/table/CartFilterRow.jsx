import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow } from "components/table";
import { setFilters } from "../cartSlice";

export default function CartFilterRow() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.carts.filters);
  const { isAsc } = filters;

  const toggleOrder = () => {
    dispatch(setFilters({ ...filters, isAsc: !filters.isAsc }));
  };
  return (
    <TableRow>
      <TableCell className="w-1/12">
        <button
          onClick={toggleOrder}
          className="rounded-md bg-blue-200 px-3 py-1 duration-300 hover:bg-blue-300"
        >
          {isAsc ? "Asc" : "Desc"}
        </button>
      </TableCell>
      <TableCell className="w-2/12"></TableCell>
      <TableCell className="w-2/12"></TableCell>
      <TableCell className="w-6/12"></TableCell>
      <TableCell className="w-1/12"></TableCell>
    </TableRow>
  );
}
