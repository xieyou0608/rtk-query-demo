import React from "react";
import { TableCell, TableHeaderRow } from "components/table";

export default function ProductHeaderRow() {
  return (
    <TableHeaderRow>
      <TableCell className="w-1/5">Thumbnail</TableCell>
      <TableCell className="w-1/5">ID</TableCell>
      <TableCell className="w-1/5">Title</TableCell>
      <TableCell className="w-1/5">Price</TableCell>
      <TableCell className="w-1/5">Category</TableCell>
    </TableHeaderRow>
  );
}
