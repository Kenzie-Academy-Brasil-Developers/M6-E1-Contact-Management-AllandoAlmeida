"use client";

import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import Inputs from "../../inputs/Inputs";
import { ISignUp } from "@/services/requests/register.request/@type.register";
import { signUp } from "@/services/requests/register.request/register.request";
export const SignUpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<ISignUp> = useForm<ISignUp>();

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
      signUp(data);
      reset();
  };

  return (
    <div className="flex flex-col gap-2">
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
