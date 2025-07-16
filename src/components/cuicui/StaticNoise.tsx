"use client";
import React from "react";

export const StaticNoise = ({
  opacity = 0.3,
  backgroundSize = "100px",
  className = "",
}: {
  opacity?: number;
  backgroundSize?: string;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='black' fill-opacity='0.2'%3E%3Crect width='1' height='1'/%3E%3C/svg%3E\")",
      opacity,
      backgroundSize,
      pointerEvents: "none",
    }}
  />
);
