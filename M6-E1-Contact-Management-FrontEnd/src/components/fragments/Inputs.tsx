import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface IInputsProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errors?: FieldError | undefined;
}

const Inputs: ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { errors, label, type, ...rest },
  ref
) => {
  return (
    <div className="inputbox">
      <input className ="rounded-md p-3 text-gray-900 shadow-sm placeholder:text-gray-400 h-[2rem] focus-visible:outline-none focus-visible:ring-0" ref={ref} type={type} {...rest} />
      <label htmlFor={rest.id}>{label}</label>
      {errors && typeof errors === 'object' && 'message' in errors && (
        <p>{errors.message}</p>
      )}
    </div>
  );
};

export default forwardRef(Inputs);
