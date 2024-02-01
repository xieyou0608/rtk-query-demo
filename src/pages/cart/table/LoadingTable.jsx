import React from "react";
import { TableCell } from "components/table";

export const LoadingRow = () => {
  return (
    <div className="-my-px flex h-16 w-full animate-pulse divide-x border">
      <TableCell className="w-1/12">
        <div className="h-6 w-6 rounded-lg bg-gray-300" />
      </TableCell>
      <TableCell className="w-2/12">
        <div className="h-6 w-6 rounded-lg bg-gray-300" />
      </TableCell>
      <TableCell className="w-2/12">
        <div className="h-5 w-24 rounded-md bg-gray-300" />
      </TableCell>
      <TableCell className="flex w-6/12 flex-col space-y-1">
        <div className="h-4 w-48 rounded-md bg-gray-300" />
        <div className="h-4 w-48 rounded-md bg-gray-300" />
      </TableCell>
      <TableCell className="w-1/12">
        <div className="h-10 w-20 rounded-lg bg-gray-300" />
      </TableCell>
    </div>
  );
};

export const LoadingTable = ({ pageSize }) => {
  const numList = [...Array(pageSize).keys()]; // [0, 1, 2, ...]
  return (
    <>
      {numList.map((num) => (
        <LoadingRow key={num} />
      ))}
    </>
  );
};
