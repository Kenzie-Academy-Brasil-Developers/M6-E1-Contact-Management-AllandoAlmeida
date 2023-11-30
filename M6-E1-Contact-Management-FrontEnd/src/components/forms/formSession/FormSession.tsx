"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../../fragments/Inputs";
import { ButtonNavPage } from "../../fragments/Buttons/buttonNavPage";
import { IFormSession } from "./@type.formSession";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";

export const FormSession: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<IFormSession> = useForm<IFormSession>();

  const onSubmit: SubmitHandler<IFormSession> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="w-full h-[35rem]  flex flex-col gap-y-10">
      <div className="box flex-col w-[28rem] h-[full] gap-y-10 ">
        <form
          className="flex flex-col gap-y-7  w-[100%] p-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-[2rem]">
            <h2>Login</h2>
          </div>
          <div className="flex flex-col mt-[2rem] gap-y-10">
            <Inputs
              className="inputbox"
              label={"Username:"}
              type="username"
              placeholder=""
              {...register("username")}
              errors={errors.username}
            />

            <Inputs
              className="inputbox"
              label={"Senha:"}
              type="password"
              placeholder=""
              {...register("password")}
              errors={errors.password}
            />
            <ButtonToAccess type="submit" text="Entrar" styles={"btnAccess"} />
          </div>
        </form>
        <div className="w-full p-7">
          <ButtonNavPage text={"Ainda não possui uma conta?"} herf={"/signUp"} option={"Cadastre-se"} />
        </div>
      </div>
    </div>
  );
};
