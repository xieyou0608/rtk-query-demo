import React from "react";
import { TableCell, TableHeaderRow } from "components/table";

export default function UserHeaderRow() {
  return (
    <TableHeaderRow>
      <TableCell className="w-1/5">ID</TableCell>
      <TableCell className="w-1/5">Email</TableCell>
      <TableCell className="w-1/5">Name</TableCell>
      <TableCell className="w-2/5">Phone</TableCell>
    </TableHeaderRow>
  );
}
