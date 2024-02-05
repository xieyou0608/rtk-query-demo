import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "hooks/useQuery";
import { apiQueryCategories } from "apis/productApi";
import { TableCell, TableRow } from "components/table";
import { setFilters } from "../productSlice";

export default function ProductFilterRow() {
  const { data: categoryOptions, isLoading } = useQuery({
    queryFunc: apiQueryCategories,
  });
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.products.filters);
  const { isAsc, categoryId } = filters;

  const toggleOrder = () => {
    dispatch(setFilters({ ...filters, isAsc: !filters.isAsc }));
  };
  const handleChangeCategory = (e) => {
    dispatch(setFilters({ ...filters, categoryId: e.target.value }));
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
      <TableCell className="w-1/5">
        {isLoading ? (
          "Loading..."
        ) : (
          <select
            value={categoryId}
            className="border px-1 py-1"
            onChange={handleChangeCategory}
          >
            <option value="">All</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </TableCell>
    </TableRow>
  );
}
