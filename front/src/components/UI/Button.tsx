import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`
        mt-8 pt-1 pb-2 px-4 cursor-pointer text-center rounded-full border-2 border-gray-400 hover:bg-gray-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
