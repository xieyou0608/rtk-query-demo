import React from "react";
import { TableCell, TableRow } from "components/table";

export default function ProductRow({ product }) {
  return (
    <TableRow className="h-32">
      <TableCell className="w-1/5">
        <img
          src={product.image}
          alt={product.id}
          className="h-full w-full object-contain"
        />
      </TableCell>
      <TableCell className="w-1/5">{product.id}</TableCell>
      <TableCell className="w-1/5">{product.title}</TableCell>
      <TableCell className="w-1/5">{product.price}</TableCell>
      <TableCell className="w-1/5">{product.category}</TableCell>
    </TableRow>
  );
}
