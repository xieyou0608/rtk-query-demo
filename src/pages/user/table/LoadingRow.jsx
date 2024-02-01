import { TableCell, TableRow } from "components/table";
import React from "react";

export default function LoadingRow() {
  return (
    <TableRow className="h-32">
      <TableCell className="w-full">Loading...</TableCell>
    </TableRow>
  );
}
