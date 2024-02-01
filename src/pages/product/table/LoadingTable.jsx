import React from "react";
import { TableCell } from "components/table";

export const LoadingRow = () => {
  return (
    <div className="-my-px flex h-32 w-full animate-pulse divide-x border">
      <TableCell className="w-1/5">
        <div className="h-4/5 w-4/5 rounded-md bg-gray-300" />
      </TableCell>
      <TableCell className="w-1/5">
        <div className="h-6 w-6 rounded-lg bg-gray-300" />
      </TableCell>
      <TableCell className="w-1/5">
        <div className="h-10 w-20 rounded-lg bg-gray-300" />
      </TableCell>
      <TableCell className="w-1/5">
        <div className="h-10 w-20 rounded-lg bg-gray-300" />
      </TableCell>
      <TableCell className="w-1/5">
        <div className="h-10 w-20 rounded-lg bg-gray-300" />
      </TableCell>
    </div>
  );
};

export default function LoadingTable({ pageSize }) {
  const numList = [...Array(pageSize).keys()]; // [0, 1, 2, ...]
  return (
    <>
      {numList.map((num) => (
        <LoadingRow key={num} />
      ))}
    </>
  );
}
