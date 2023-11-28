"use client";

import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import { ILogin } from "../../../services/request/login.request/@type.login";
import { login } from "../../../services/request/login.request/login.request";
import Inputs from "../../fragments/inputs/Inputs";

export const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<ILogin> = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    login(data);
    reset();
  };

  return (
    <div className="">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          htmlFor={""}
          type={"text"}
          label={"Usuário"}
          placeholder={"Digite o usuário"}
          {...register("username")}
          error={errors.username}
        />
        <Inputs
          htmlFor={""}
          label={"Senha"}
          type={"password"}
          placeholder={"Digite a sua senha"}
          {...register("password")}
          error={errors.password}
          required
        />
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
