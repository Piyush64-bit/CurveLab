// components/Logo.tsx
import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-light tracking-tight text-gray-300 hover:text-white transition-colors duration-300 ${className}`}
    >
      <span className="font-extralight">Curve</span>
      <span className="font-normal">Lab</span>
    </span>
  );
}
