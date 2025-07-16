// Sidebar.tsx
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {CurveLabLogo} from "../components/Logos";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/docs/hypocycloid", label: "Hypocycloid" },
    { to: "/docs/epicycloid", label: "Epicycloid" },
    { to: "/docs/epitrochoid", label: "Epitrochoid" },
    { to: "/docs/hypotrochoid", label: "Hypotrochoid" },
    { to: "/docs/lissajous", label: "Lissajous" },
    { to: "/docs/rose", label: "Rose" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-black border-b border-white/10 flex items-center justify-between px-4 py-3 md:hidden z-30">
        <Link to="/" className="flex items-center gap-2">
          <CurveLabLogo className="text-2xl" />
        </Link>
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Simple Hamburger */}
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
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-14 left-0 w-full bg-black border-b border-white/10 z-20 md:hidden">
          <ul className="flex flex-col space-y-1 p-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg font-light transition ${
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

      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/10 p-6 z-10 flex flex-col hidden md:flex">
        <Link
          to="/"
          className="flex items-center justify-center mb-10 mt-[111px]"
        >
          <CurveLabLogo className="text-3xl" />
        </Link>

        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-medium">
          Documentation
        </h2>

        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg font-light transition ${
                    isActive
                      ? "bg-white text-black font-medium"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
