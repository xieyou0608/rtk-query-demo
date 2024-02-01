import React, { useState, useEffect } from "react";
import { apiQueryCategories } from "apis/productApi";
import { TableCell, TableRow } from "components/table";

export default function ProductFilterRow({ filters, setFilters }) {
  const { isAsc, categoryId } = filters;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        const result = await apiQueryCategories();
        setCategoryOptions(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const toggleOrder = () => {
    setFilters({ ...filters, isAsc: !filters.isAsc });
  };
  const handleChangeCategory = (e) => {
    setFilters({ ...filters, categoryId: e.target.value });
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
