// src/components/Logos.jsx
import React from "react";

export const HypocycloidLogo = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M 60,20 
         C 80,20 100,40 100,60 
         C 100,80 80,100 60,100 
         C 40,100 20,80 20,60 
         C 20,40 40,20 60,20 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.85"
    />
    <circle cx="60" cy="60" r="2.5" fill="currentColor" opacity="0.6" />
  </svg>
);

export const EpicycloidLogo = ({ className = "" }) => (
    <svg 
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M 60,15 Q 105,30 95,75 Q 60,105 25,75 Q 15,30 60,15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
        />
        <path
            d="M 60,25 Q 95,40 85,75 Q 60,95 35,75 Q 25,40 60,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
        />
    </svg>
);

export const HypotrochoidLogo = ({ className = "" }) => (
    <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M 15,60 Q 35,25 60,60 Q 85,95 105,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
        />
        <path
            d="M 60,15 Q 25,35 60,60 Q 95,85 60,105"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
        />
        <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.6" />
    </svg>
);

export const EpitrochoidLogo = ({ className = "" }) => (
    <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
        />
        <circle
            cx="60"
            cy="60"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
        />
        <circle
            cx="60"
            cy="60"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
        />
        <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.8" />
    </svg>
);

export const LissajousLogo = ({ className = "" }) => (
    <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M 20,60 Q 40,20 60,60 Q 80,100 100,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
        />
        <path
            d="M 60,20 Q 100,40 60,60 Q 20,80 60,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
        />
    </svg>
);

export const RoseLogo = ({ className = "" }) => (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 60,20 Q 100,40 80,80 Q 60,100 40,80 Q 20,60 40,40 Q 60,20 80,40 Q 100,60 80,80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <circle cx="60" cy="60" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
);

export function CurveLabLogo({ className = "" }) {
  return (
    <span
      className={`font-light tracking-tight text-gray-300 hover:text-white transition-colors duration-300 ${className}`}
    >
      <span className="font-extralight">Curve</span>
      <span className="font-normal">Lab</span>
    </span>
  );
}