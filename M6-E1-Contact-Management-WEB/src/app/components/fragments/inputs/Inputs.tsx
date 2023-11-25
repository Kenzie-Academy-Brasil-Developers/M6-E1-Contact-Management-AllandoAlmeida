import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { FieldError } from "react-hook-form";

interface IInputsProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
  label: string;
  htmlFor: string;
  error?: FieldError;
}

const Inputs: React.ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { error, label, htmlFor, ...rest },
  ref: Ref<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};

export default forwardRef(Inputs);
