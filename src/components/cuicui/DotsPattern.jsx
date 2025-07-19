"use client";
import React from "react";

export const DotsPattern = ({
  width = 8,
  height = 8,
  className = "",
}) => (
  <svg
    className={className}
    width="100%"
    height="100%"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <circle cx="1" cy="1" r="1" />
  </svg>
);