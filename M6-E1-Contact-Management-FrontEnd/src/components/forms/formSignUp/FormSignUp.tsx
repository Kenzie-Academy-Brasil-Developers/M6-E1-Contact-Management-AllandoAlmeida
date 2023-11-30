"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../../fragments/Inputs";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";
import { ButtonNavPage } from "@/components/fragments/Buttons/buttonNavPage";
import { IFormSignUp } from "./@type.formSignUp";

/*
  confirmPassword: string;
  telephone: string;
  email: string; */

export const FormSignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<IFormSignUp> = useForm<IFormSignUp>();

  const onSubmit: SubmitHandler<IFormSignUp> = (data) => {
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
            <h2>Cadastro</h2>
          </div>
          <div className="flex flex-col mt-[2rem] gap-y-10">
            <Inputs
              className="inputbox"
              label={"Nome Completo:"}
              type="name"
              placeholder=""
              {...register("name")}
              errors={errors.name}
            />

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
              label={"Contato:"}
              type="telephone"
              placeholder=""
              {...register("telephone")}
              errors={errors.telephone}
            />

            <Inputs
              className="inputbox"
              label={"Sobre você:"}
              type="bio"
              placeholder=""
              {...register("bio")}
              errors={errors.bio}
            />

            <Inputs
              className="inputbox"
              label={"E-mail:"}
              type="email"
              placeholder=""
              {...register("email")}
              errors={errors.email}
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
            text={"Acesse a sua Conta!"}
            herf={"/"}
            option={"LOGIN"}
          />
        </div>
      </div>
    </div>
  );
};
