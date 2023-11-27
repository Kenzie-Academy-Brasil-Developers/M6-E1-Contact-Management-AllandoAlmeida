"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../fragments/inputs/Inputs";
import { ISignUp, signUp } from "@/app/services/request/register.request";

export const SignUpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<ISignUp> = useForm<ISignUp>();

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
      console.log(data);
      signUp(data);
      reset();
  };

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <Inputs
            htmlFor={""}
            type={"text"}
            label={"Nome"}
            placeholder={"Digite seu nome completo"}
            {...register("name")}
            error={errors.name}
          />
          <Inputs
            htmlFor={""}
            type={"text"}
            label={"Usuário"}
            placeholder={"Digite o usuário"}
            {...register("username")}
            error={errors.username}
          />
        </div>

        <div className="flex gap-5">
          <Inputs
            htmlFor={""}
            type={"email"}
            label={"email"}
            placeholder={"Digite seu e-mail"}
            {...register("email")}
            error={errors.email}
          />
          <Inputs
            htmlFor={""}
            type={"text"}
            label={"Telefone"}
            placeholder={"Digite seu telefone"}
            {...register("telephone")}
            error={errors.telephone}
          />
        </div>
        <div className="flex gap-5">
          <Inputs
            htmlFor={""}
            label={"Senha"}
            type={"password"}
            placeholder={"Digite a sua senha"}
            {...register("password")}
            error={errors.password}
            required
          />
         {/*  <Inputs
            htmlFor={""}
            label={"Confirme sua senha"}
            type={"password"}
            placeholder={"Digite a sua senha"}
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            required
          /> */}
        </div>
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
