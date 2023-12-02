"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../../../components/fragments/Inputs";
import { ButtonNavPage } from "../../../components/fragments/Buttons/buttonNavPage";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";
import React from "react";
import { Session } from "@/app/(login)/service/session.service";

interface IFormSession {
  username: string;
  password: string;
  FieldValues: any;
}

export const FormSession: React.FC<{ onLogin: (data: IFormSession) => void }> = ({ onLogin }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<IFormSession> = useForm<IFormSession>();

  const onSubmit: SubmitHandler<IFormSession> = async (data) => {
    // Envie a requisição de login
    const responseData = await Session(data);

    // Chame a função onLogin apenas se o login for bem-sucedido
    if (responseData) {
      onLogin(data);
    }

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
          <ButtonNavPage
            text={"Ainda não possui uma conta?"}
            herf={"/signup"}
            option={"Cadastre-se"}
          />
        </div>
      </div>
    </div>
  );
};
