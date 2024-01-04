import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="absolute flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Home</h1>
        <Link
          to="/product"
          className="m-1 rounded-xl bg-gray-200 px-3 py-3 duration-300 hover:bg-gray-300"
        >
          Go to product page
        </Link>
      </div>
    </div>
  );
}
