import React from "react";

export default function PaginationBar({
  totalLength,
  pageSize,
  curPage,
  setCurPage,
}) {
  const numPages = Math.ceil(totalLength / pageSize);
  const numList = [...Array(numPages).keys()]; // [0, 1, 2, ...]

  return (
    <div className="flex">
      {numList.map((num) => (
        <button
          key={num}
          className={`h-8 w-10 border border-gray-600 ${
            curPage === num ? "bg-blue-300" : "hover:bg-blue-300"
          }`}
          onClick={() => setCurPage(num)}
        >
          {num + 1}
        </button>
      ))}
    </div>
  );
}
