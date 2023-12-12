import { register } from "module";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";



interface IInputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: { message?: string } | undefined;
  defaultValue: string;
  register?: UseFormRegisterReturn;
}

const InputsEdit: ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { errors, label, type, defaultValue, register, ...rest },
  
) => {

  return (
    <div className="inputbox">
      <input
        className="rounded-md p-3 text-gray-900 shadow-sm placeholder:text-gray-400 h-[2rem] focus-visible:outline-none focus-visible:ring-0"
      
        type={type}
        {...rest}
        {...register}
        defaultValue={defaultValue}
      />
      <label htmlFor={rest.id}>{label}</label>
      {errors && typeof errors === "object" && "message" in errors && (
        <p>{errors.message}</p>
      )}
    </div>
  );
};

export default forwardRef(InputsEdit);
