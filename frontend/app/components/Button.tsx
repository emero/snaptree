import React, { ReactElement, ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, icon, onClick }: ButtonProps) => {
  const clonedIcon = icon ? (
    React.cloneElement(icon as ReactElement<any>, {
      className: "size-5 text-white md:-ml-1",
    })
  ) : (
    <></>
  );
  return (
    <button
      className="flex items-center bg-accent text-sm text-white py-2 px-4 rounded-md"
      onClick={onClick}
    >
      {clonedIcon}
      <span className="hidden md:inline-flex ml-2">{children}</span>
    </button>
  );
};

export default Button;
