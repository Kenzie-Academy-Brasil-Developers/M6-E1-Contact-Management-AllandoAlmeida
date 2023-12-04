"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../../../components/fragments/Inputs";
import React, { useState } from "react";
import { useViaCepService } from "@/service/useViaCep.service";
import { ButtonNav } from "@/components/fragments/Buttons/buttonNavegate";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";
import { ButtonNavPage } from "@/components/fragments/Buttons/buttonNavPage";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { newContact } from "../service/contact.request";

export interface IContactForm {
  name: string;
  zipCode: string;
  street: string;
  complement: string;
  district: string;
  locality: string;
  state: string;
  phones: { telephone: string }[];
  emails: { email: string }[];
}

export const FormContacts: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<IContactForm> = useForm<IContactForm>();

  const [address, setAddress] = useState<IContactForm>({
    name: "",
    phones: [{ telephone: "" }],
    emails: [{ email: "" }],
    street: "",
    complement: "",
    zipCode: "",
    district: "",
    locality: "",
    state: "",
  });

  const getAddress = useViaCepService();
  const fetchAddress = async (cep: string) => {
    try {
      const response = await getAddress(cep);
      setValue("street", response.street || "");
      setValue("complement", address.complement || "");
      setValue("zipCode", address.zipCode || "");
      setValue("district", response.district || "");
      setValue("locality", response.locality || "");
      setValue("state", response.state || "");
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleBuscarCepClick = () => {
    fetchAddress(address.zipCode);
  };

  const handleBlur = (value: string) => {
    fetchAddress(value);
  };

  const onSubmit: SubmitHandler<IContactForm> = async (data) => {
    try {
      console.log('contato', data)
      await newContact(data);
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário:", error);
    }
  };
  return (
    <div className="w-full h-[50rem]  flex flex-col">
      <div className="box flex-col w-[35rem] ">
        <div className="flex w-[100%] items-center mt-[2rem] justify-between p-7">
          <h1 className="text-[2.5rem]">Contatos</h1>
          <Link href={"/profile"}>
            <CloseIcon />
          </Link>
        </div>

        <form
          className="flex flex-col gap-y-7 mb-[2rem] w-[100%] px-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between items-center"></div>
          <div className="flex flex-col mt-[2rem] gap-y-10">
            <div className="flex flex-col gap-y-8">
              <Inputs
                className="inputbox"
                label={"Nome Completo:"}
                type="name"
                {...register("name")}
                errors={errors.name}
              />

              <Inputs
                className="inputbox"
                label={"E-mail:"}
                type="email"
                {...register("emails.0.email")}
                errors={errors.emails?.[0]?.email}
              />

              <Inputs
                className="inputbox"
                label={"Telefone:"}
                type="telefone"
                {...register("phones.0.telephone")}
                errors={errors.phones?.[0]?.telephone}
              />
            </div>
            <div className="flex gap-y-10">
              <h2>Endereço</h2>
            </div>

            <div className="flex items-center flex-wrap gap-5">
              <div>
                <Inputs
                  className="inputbox"
                  label={"Cep:"}
                  type="text"
                  id="zipCode"
                  //value={address.zipCode}
                  placeholder={""}
                  {...register("zipCode")}
                  onBlur={(e) => handleBlur(e.target.value)}
                  onChange={(e) =>
                    setAddress((prevAddress) => ({
                      ...prevAddress,
                      zipCode: e.target.value, //setValues
                    }))
                  }
                />
              </div>
              <div>
                <ButtonNav
                  type="button"
                  className="block w-[100px] h-[30px] rounded-md bg-indigo-600 px-3.5 py-2.5 my-2 text-center text-[0.8rem] font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                  onClick={handleBuscarCepClick}
                  text={"Pesquisar"}
                />
              </div>
            </div>
            <div className="flex md:flex-col gap-y-5">
              <Inputs
                className="inputbox"
                label={"Rua:"}
                type="text"
                id="street"               
                placeholder={""}
                {...register("street")}
              />
              <Inputs
                className="inputbox"
                label={"Numero:"}
                type="text"
                //value={address.complement}
                placeholder={""}
                {...register("complement")}
              />
            </div>
            <div className="flex">
              <Inputs
                className="inputbox"
                label={"Bairro:"}
                type="text"
                id="district"
                //value={address.district}
                placeholder={""}
                {...register("district")}
              />
              <Inputs
                className="inputbox"
                label={"Cidade:"}
                type="text"
                id="locality"
                //value={address.locality}
                placeholder={""}
                {...register("locality")}
              />
              <Inputs
                className="inputbox"
                label={"Estado (UF):"}
                type="text"
                id="state"
                //value={address.state}
                placeholder={""}
                {...register("state")}
              />
            </div>
            <ButtonToAccess type="submit" text="SALVAR" styles={"btnAccess"}/>
          </div>
        </form>
      </div>
    </div>
  );
};
