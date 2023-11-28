"use client";

import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import Inputs from "../../inputs/Inputs";
import { Button } from "@/components/ui/button";
import { ILogin } from "@/services/requests/login.request/@type.login";
import { login } from "@/services/requests/login.request/login.request";

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
    <div className="flex flex-col m-[5rem]">
  <p>Login</p>
  <div className="flex flex-col">
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          htmlFor={""}
          type={"text"}
          label={"Usuário"}
          placeholder={"Digite o usuário"}
          inputWidth="10rem"
          {...register("username")}
          error={errors.username}
        />
        <Inputs
          htmlFor={"password"}
          label={"Senha"}
          type={"password"}
          placeholder={"Digite a sua senha"}
          {...register("password")}
          inputWidth="10rem"
          error={errors.password}
          required
        />
        <Button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar
        </Button>
      </form>
      </div>
    </div>
  );
};
