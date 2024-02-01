import React from "react";
import { TableCell, TableRow } from "components/table";

export default function UserRow({ user }) {
  return (
    <TableRow>
      <TableCell className="w-1/5">{user.id}</TableCell>
      <TableCell className="w-1/5">{user.email}</TableCell>
      <TableCell className="w-1/5">{user.username}</TableCell>
      <TableCell className="w-2/5 flex-col">{user.phone}</TableCell>
    </TableRow>
  );
}
