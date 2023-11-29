/* // Inputs.tsx

import { Input } from "@/components/ui/input";
import React, {
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
    <div className="">
      <Label
        htmlFor={htmlFor}
        className="block text-smfont-semibold leading-4 text-gray-500"
      >
        {label}
      </Label>
      <Input
        {...rest}
        ref={ref}
        className="block rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};

export default forwardRef(Inputs);
 */

import { Label } from "@radix-ui/react-label";
import React, {
  CSSProperties,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";
import { Input } from "../ui/input";

// Inputs.tsx

/* import { Input } from "@/components/ui/input";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  CSSProperties, // Importe a interface CSSProperties do React
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
  inputWidth?: string;
}

const Inputs: React.ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { label, error, htmlFor, inputWidth, ...rest },
  ref
) => {
  const inputStyle: CSSProperties = {
    width: inputWidth || "100%",
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <Label
        htmlFor={htmlFor}
        className="block text-sm font-semibold leading-4 text-gray-500"
      >
        {label}
      </Label>
      <Input
        {...rest}
        ref={ref}
        style={inputStyle}
        className="block rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};


export default forwardRef(Inputs);
 */

// Inputs.tsx

// ... Importações e código anterior

interface IInputsProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: FieldError | undefined;
  htmlFor?: string;
  inputWidth?: string;
  inputContainerClass: any;
}

const Inputs: React.ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { label, error, htmlFor, inputWidth, inputContainerClass, ...rest },
  ref
) => {
  const inputStyle: CSSProperties = {
    width: inputWidth || "100%",
  };

  return (
    <div className={`${inputContainerClass}`}>
      <Input
        {...rest}
        ref={ref}
        style={{
          ...inputStyle,
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
        }}
        className="rounded-md p-3 text-gray-900 shadow-sm placeholder:text-gray-400 h-[2rem] focus-visible:outline-none focus-visible:ring-0" 
      />
      <Label htmlFor={htmlFor} className="">
        {label}
      </Label>
      {error ? <span>{error.message}</span> : null}
    </div>
  );
};

export default forwardRef(Inputs);
