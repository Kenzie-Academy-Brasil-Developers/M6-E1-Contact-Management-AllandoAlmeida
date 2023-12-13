"use client";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../fragments/Inputs";
import React, { useState } from "react";
import { useViaCepService } from "@/service/useViaCep.service";
import { ButtonNav } from "@/components/fragments/Buttons/buttonNavegate";
import { ButtonToAccess } from "@/components/fragments/Buttons/buttonAccess";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { redirect, useRouter } from "next/navigation";
import { fetchContact } from "@/contexts/contactContext";
import { ContactData, IContactType } from "@/schema/contact.schema";


export const FormContacts: React.FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  }: UseFormReturn<ContactData> = useForm<ContactData>();
  const router = useRouter()

  const [address, setAddress] = useState<IContactType>({
    name: "",
    street: "",
    complement: "",
    zipCode: "",
    district: "",
    locality: "",
    state: "",
    telephone: "",
    email: "",
  });

  const getAddress = useViaCepService();
  const fetchAddress = async (cep: string | undefined) => {
    if(cep){
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
    } else {
      console.error("CEP não fornecido");
    }
  };

  const handleBuscarCepClick = () => {
    fetchAddress(address.zipCode);
  };

  const handleBlur = (value: string) => {
    fetchAddress(value);
  };

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    try {
      await fetchContact(data);
      router.push('/customers')
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário:", error);
    }
  };
  return (
    <div className="w-full h-[50rem]  flex flex-col">
      <div className="box flex-col w-[35rem] ">
        <div className="flex w-[100%] items-center mt-[2rem] justify-between p-7">
          <h1 className="text-[2.5rem]">Contatos</h1>
          <Link href={"/customers"}>
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
                placeholder=""
                {...register("email")}
                errors={errors.email}
              />

              <Inputs
                className="inputbox"
                label={"Contato:"}
                type="telephone"
                placeholder=""
                {...register("telephone")}
                errors={errors.telephone}
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
                  value={address.zipCode}
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
            <ButtonToAccess
              type="submit"
              text="SALVAR"
              styles={"btnAccess"}
              width={undefined}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
