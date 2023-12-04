/* // InputsEdit.tsx

import React, { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface IInputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldError | undefined;
  isEditing: boolean; // Adicione a propriedade isEditing
}

const InputsEdit: ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { errors, label, type, isEditing, ...rest },
  ref
) => {
  return (
    <div className="inputbox">
      <input
        className="rounded-md p-3 text-gray-900 shadow-sm placeholder:text-gray-400 h-[2rem] focus-visible:outline-none focus-visible:ring-0"
        ref={ref}
        type={type}
        {...rest}
        readOnly={!isEditing} // Use a propriedade isEditing aqui
      />
      <label htmlFor={rest.id}>{label}</label>
      {errors && typeof errors === 'object' && 'message' in errors && (
        <p>{errors.message}</p>
      )}
    </div>
  );
};

export default forwardRef(InputsEdit);
 */

// No início do seu componente, certifique-se de importar useState e useEffect
import React, { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

// ... (seu código)

interface IInputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: { message?: string } | undefined;
  isEditing: boolean;
  value: string; // Adicione a propriedade value
}

const InputsEdit: ForwardRefRenderFunction<HTMLInputElement, IInputsProps> = (
  { errors, label, type, isEditing, value, ...rest },
  ref
) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value, isEditing]);

  return (
    <div className="inputbox">
      <input
        className="rounded-md p-3 text-gray-900 shadow-sm placeholder:text-gray-400 h-[2rem] focus-visible:outline-none focus-visible:ring-0"
        ref={ref}
        type={type}
        {...rest}
        readOnly={!isEditing}
        value={inputValue} // Use inputValue ao invés de value diretamente
        onChange={(e) => setInputValue(e.target.value)} // Atualize o valor localmente
      />
      <label htmlFor={rest.id}>{label}</label>
      {errors && typeof errors === 'object' && 'message' in errors && (
        <p>{errors.message}</p>
      )}
    </div>
  );
};

export default forwardRef(InputsEdit);
