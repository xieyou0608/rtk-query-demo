import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen,
  onClose,
  height = "min-h-[50vh] max-h-[90vh] sm:max-h-[80vh]",
  width = "w-11/12 sm:w-auto sm:max-w-7xl",
  className,
}) {
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event) => {
        event.stopPropagation(); // Avoid closing other modal
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape, false);

      return () => {
        document.removeEventListener("keydown", handleEscape, false);
      };
    }
  }, [isOpen]);

  return createPortal(
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-500 bg-opacity-75 duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg bg-white p-4 sm:p-6 ${height} ${width} ${className} overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
