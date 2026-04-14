import React from "react";

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      rounded-full px-5 py-2 text-sm font-medium
      bg-linear-to-br from-indigo-500 to-indigo-600
      transition-all duration-200
      hover:opacity-90
      active:scale-95
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const GhostButton = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`
      inline-flex items-center gap-2
      rounded-full px-4 py-2 text-sm font-medium
      border border-white/10
      bg-white/5
      backdrop-blur-sm
      transition-all duration-200
      hover:bg-white/10
      active:scale-95
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);
