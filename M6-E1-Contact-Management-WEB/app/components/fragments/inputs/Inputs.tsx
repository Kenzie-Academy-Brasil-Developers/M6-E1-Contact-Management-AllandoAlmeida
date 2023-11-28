// Inputs.tsx

import { Input } from "@/components/ui/input";
import React, {
  CSSProperties,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface IInputsProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: FieldError | undefined;
  htmlFor?: string;
}

const Inputs: React.ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { label, error, htmlFor, size, ...rest },
  ref
) => {
  return (
    <div className="grid grid-cols-1 border-2">
      <Label
        htmlFor={htmlFor}
        className="block text-smfont-semibold leading-4 text-gray-500"
      >
        {label}
      </Label>
      <Input
        {...rest}
        ref={ref}
        className="block rounded-md border-1 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};

export default forwardRef(Inputs);
