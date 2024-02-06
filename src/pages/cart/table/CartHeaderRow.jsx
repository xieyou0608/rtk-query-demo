import React from "react";
import { TableCell, TableHeaderRow } from "components/table";

export default function CartHeaderRow() {
  return (
    <TableHeaderRow>
      <TableCell className="w-1/12">ID</TableCell>
      <TableCell className="w-2/12">User Name</TableCell>
      <TableCell className="w-2/12">Date</TableCell>
      <TableCell className="w-6/12">products</TableCell>
      <TableCell className="w-1/12"></TableCell>
    </TableHeaderRow>
  );
}
