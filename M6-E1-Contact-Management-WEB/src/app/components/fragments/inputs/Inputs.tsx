// Inputs.tsx

import React, { CSSProperties, DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import style from "styled-jsx/style";

interface IInputsProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: FieldError | undefined;
  htmlFor?: string;
}

const Inputs: React.ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { label, error, htmlFor, size, ...rest },
  ref
) => {
  const inputStyle: CSSProperties = { width: "100%", ...style };

  return (
    <div className="flex flex-col gap-0.5 my-2">
      <label
        htmlFor={htmlFor}
        className="block text-[0.7rem] font-semibold leading-4 text-gray-500"
      >
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        size={size ? size : undefined}
        style={inputStyle}
        className="block rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};

export default forwardRef(Inputs);
