import React from "react";
import { NavLink } from "react-router-dom";

const StyledLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 duration-300 ${
          isActive ? "bg-gray-700 text-white" : "hover:bg-gray-300"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default function Navbar() {
  return (
    <div className="sticky z-10 flex h-20 items-center justify-center space-x-3 px-10 shadow">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/product">Product</StyledLink>
      <StyledLink to="/cart">Cart</StyledLink>
      <StyledLink to="/user">User</StyledLink>
    </div>
  );
}
