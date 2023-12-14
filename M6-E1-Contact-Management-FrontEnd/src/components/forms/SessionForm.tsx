import { useForm } from "react-hook-form";
import Inputs from "../fragments/Inputs";
import { ButtonNavPage } from "../fragments/Buttons/buttonNavPage";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";
import React from "react";
import { useAuth } from "@/contexts/authContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { SessionData, SessionSchema } from "@/schema/session.schema";

export const SessionForm = () => {
  const { register, handleSubmit } = useForm<SessionData>({
    resolver: zodResolver(SessionSchema),
  });
  const { session } = useAuth();

  const onSubmit = async (data: SessionData) => {
    console.log('session', data)
    session(data);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="box flex-col w-[28rem]  gap-y-5">
        <form
          className="flex flex-col gap-y-7  w-[100%] p-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-[2rem] font-bold">
            <h1 className="text-[3rem]">LOGIN</h1>
          </div>
          <div className="flex flex-col mt-[2rem] gap-y-10">
            <Inputs
              className="inputbox"
              label={"Username:"}
              type="username"
              placeholder=""
              {...register("username")}
            />

            <Inputs
              className="inputbox"
              label={"Senha:"}
              type="password"
              placeholder=""
              {...register("password")}
            />
            <ButtonToAccess
              type="submit"
              text="Entrar"
              styles={"btnAccess"}
              width={undefined}
            />
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