import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={`text-sm font-medium ${props.className || ""}`}
    >
      {children}
    </label>
  );
};
