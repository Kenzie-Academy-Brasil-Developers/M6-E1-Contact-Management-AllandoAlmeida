"use client";

import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import Inputs from "../../inputs/Inputs";
import { Button } from "@/components/ui/button";
import { ILogin } from "@/services/requests/login.request/@type.login";
import { login } from "@/services/requests/login.request/login.request";
import { ButtonNav } from "@/components/Buttons/buttonNav/ButtonNav";

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
      <div className="box">
        <div className="flex flex-col gap-5">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <p>Login</p>
            <Inputs
              className="inputbox"
              inputContainerClass="inputbox"
              htmlFor={""}
              type={"text"}
              label={"Usuário"}
              placeholder={""}
              inputWidth="13rem"
              {...register("username")}
              error={errors.username}
            />
            <Inputs
              inputContainerClass="inputbox"
              htmlFor={"password"}
              label={"Senha"}
              type={"password"}
              placeholder={""}
              {...register("password")}
              inputWidth="10rem"
              error={errors.password}
              required
            />
            <Button
              variant={"secondary"}
              type="submit"
              className="bg-gray-600 w-[13rem] mx-[2rem]"
            >
              Enviar
            </Button>
            <div>
              <div className="flex flex-col item-center w-[13rem] gap-5 mt-[2rem] ml-[2rem] my-[1rem]">
                <p className="text-center">Não tem uma conta?</p>
                <div className="bg--g">
                  <ButtonNav
                    text={""}
                    href={"/register"}
                    width={"120"}
                    height={"20"}
                    textcolor={"white"} textSize={"1rem"}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
