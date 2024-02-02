import React from "react";

const colorMap = {
  white: "ring-inset ring-1 ring-black hover:bg-gray-200",
  gray: "bg-gray-300 hover:bg-gray-400",
  blue: "bg-blue-300 hover:bg-blue-400",
  teal: "bg-teal-300 hover:bg-teal-400",
  green: "bg-green-600 hover:bg-green-700 text-white",
};

/**
 *
 * @param {{
 * onClick: ()=>{} ;
 * color: "white" | "gray" | "blue" | "teal" | "green" ;
 * }} props Props for the component
 *
 */
export default function Button({
  onClick,
  color = "white",
  className,
  children,
}) {
  return (
    <button
      className={`rounded-md px-3 py-2 ${colorMap[color]} ${className} min-w-24 font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
