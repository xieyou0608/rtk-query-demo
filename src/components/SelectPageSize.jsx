import React from "react";

export default function PageSizeSelect({ pageSize, setPageSize }) {
  return (
    <select
      value={pageSize}
      onChange={(e) => setPageSize(+e.target.value)}
      className="rounded-md border border-gray-600 px-6 py-2"
    >
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
    </select>
  );
}
