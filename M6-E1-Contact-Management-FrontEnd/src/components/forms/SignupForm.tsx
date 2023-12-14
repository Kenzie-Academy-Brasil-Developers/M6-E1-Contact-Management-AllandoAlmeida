'use client'
import { useForm } from "react-hook-form";
import Inputs from "../fragments/Inputs";
import React from "react";
import { useAuth } from "@/contexts/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerData, CustomerSchema } from "@/schema/customer.schema";
import { ButtonNav } from "../ButtonNav";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const { register, handleSubmit } = useForm<CustomerData>({
    resolver: zodResolver(CustomerSchema),
  });
  const { signup } = useAuth();
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/");
  };

  const onSubmit = async (data: CustomerData) => {
    console.log('data', data)
    signup(data);
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="box flex-col md:w-[50rem] gap-y-5 ">
        <form
          className="flex flex-col gap-y-7  w-[100%] p-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-[2rem] font-bold">
            <h1 className="text-[3rem]">CADASTRO</h1>
          </div>
          <div className="flex flex-col mt-[2rem] gap-y-10">
            <div className="flex gap-x-5">
              <Inputs
                className="inputbox"
                label={"Nome Completo:"}
                type="name"
                placeholder=""
                {...register("name")}
              />
            </div>
            <div className="flex flex-col md:flex-row md:gap-x-5">
              <Inputs
                className="inputbox"
                label={"Usuário:"}
                type="username"
                placeholder=""
                {...register("username")}
              />

              <Inputs
                className="inputbox"
                label={"Contato:"}
                type="telephone"
                placeholder=""
                {...register("telephone")}
              />
            </div>
            <div className="flex gap-x-5">
              <Inputs
                className="inputbox"
                label={"E-mail:"}
                type="email"
                placeholder=""
                {...register("email")}
              />
              <Inputs
                className="inputbox"
                label={"Senha:"}
                type="password"
                placeholder=""
                {...register("password")}
              />
            </div>
            <div className="flex flex-col gap-y-5 md:flex-row md:gap-x-5">
            <ButtonNav
              width="100%"
              height="4.8rem"
              type="submit"
              text="Salvar"
              background="color-grey-1"
              textcolor="color-grey-0"
              hover="color-grey-2"
              disabled={false}
            />
             <ButtonNav
              width="100%"
              height="4.8rem"
              type="button"
              text="Login"
              background="color-color-primary-disable"
              textcolor="white"
              hover="color-grey-2"
              onClick={() =>
                handleNavigation()
              }
            />

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};