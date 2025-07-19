// Topbar.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CurveLabLogo } from "../components/Logos";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/hypocycloid", label: "Hypocycloid" },
    { to: "/epicycloid", label: "Epicycloid" },
    { to: "/epitrochoid", label: "Epitrochoid" },
    { to: "/hypotrochoid", label: "Hypotrochoid" },
    { to: "/lissajous", label: "Lissajous" },
    { to: "/rose", label: "Rose" },
  ];

  return (
    <>
      {/* Topbar Container */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 py-3 z-30">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CurveLabLogo className="text-2xl" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-light transition ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-14 left-0 w-full bg-black border-b border-white/10 z-20 md:hidden">
          <ul className="flex flex-col space-y-1 p-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded text-sm font-light transition ${
                      isActive
                        ? "bg-white text-black font-medium"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Topbar;