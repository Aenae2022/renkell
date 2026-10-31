import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`
        pt-1 pb-2 px-4 cursor-pointer text-center rounded-full 
        bg-gray-300
        border-2 border-gray-400 hover:bg-gray-400
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
