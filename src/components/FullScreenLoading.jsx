import React from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";

export default function FullScreenLoading({ children, showSpinner = true }) {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-300 bg-opacity-70">
      {showSpinner && <Spinner />}
      {children}
    </div>,
    document.body
  );
}
