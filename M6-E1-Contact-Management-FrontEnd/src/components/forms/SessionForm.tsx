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
    session(data);
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