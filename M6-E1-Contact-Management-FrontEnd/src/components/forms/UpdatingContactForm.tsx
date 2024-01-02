/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import InputsEdit from "@/components/fragments/InputsEdit";
import { ButtonNav } from "../ButtonNav";
import { useRouter } from "next/navigation";

import {
  CurrentContactData,
  IContactType,
  TContactParams,
} from "@/schema/contact.schema";
import { useContact } from "@/contexts/contactContext";

export const UpdatingContactForm = ({ ...contact }: CurrentContactData) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  }: UseFormReturn<any> = useForm();
  
  const { deleteContactParams, upDateContactParams } = useContact();

  const router = useRouter();

  useEffect(() => {
    fetchAddress();
  }, [contact]);

  const fetchAddress = () => {
    try {
      setValue("street", contact.street || "");
      setValue("complement", contact.complement || "");
      setValue("zipCode", contact.zipCode || "");
      setValue("district", contact.district || "");
      setValue("locality", contact.locality || "");
      setValue("state", contact.state || "");
      setValue("telephone", contact.telephone || "");
      setValue("email", contact.email || "");

      setValue(
        "telephone",
        typeof contact.telephone === "string" ? contact.telephone : ""
      );

      setValue("email", typeof contact.email === "string" ? contact.email : "");
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleSave = async (data: any) => {
    const contactId = String(contact.id);

    if (contactId) {
      try {
        await upDateContactParams({ params: { contactId } }, data);
        router.replace("/customers");
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const handleDelete = async ({ params }: TContactParams) => {
    if (params) {
      try {
        await deleteContactParams({ params });
        router.push("/customers");
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const onSubmit = async (data: IContactType) => {
    await handleSave(data);
  };

  return (
    <div className="w-full flex flex-col">
     <div className="box flex-col w-[35rem]">
        <div className="flex w-[100%] items-center justify-between p-7">
          <h1 className="text-[2.5rem]">Contatos</h1>
          <Link href={"/customers"}>
            <CloseIcon />
          </Link>
        </div>

        <form
          className="flex flex-col gap-y-7 mb-[2rem] w-[100%] px-7"
          onSubmit={handleSubmit(onSubmit)}
        >
         <div className="flex flex-col gap-y-8">
            <InputsEdit
              defaultValue={contact?.name}
              className="inputbox"
              label={"Nome Contato:"}
              type="text"
              id="name"
              register={register("name")}
            />

            <InputsEdit
              defaultValue={contact?.email}
              className="inputbox"
              label={"E-mail:"}
              type="text"
              id="email"
              register={register("email")}
            />
            <div>
              <InputsEdit
                defaultValue={contact?.telephone}
                className="inputbox"
                label={"Contato"}
                type="text"
                id="telephone"
                register={register("telephone")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <InputsEdit
              defaultValue={contact?.zipCode}
              className="inputbox"
              label={"CEP:"}
              type="text"
              id="zipCode"
              placeholder={contact?.zipCode}
              register={register("zipCode")}
            />
            <div className="flex gap-y-8">
              <InputsEdit
                className="inputbox"
                label={"Rua:"}
                type="text"
                id="street"
                defaultValue={contact?.street}
                register={register("street")}
              />
              <InputsEdit
                className="inputbox"
                label={"Numero:"}
                type="text"
                id="complement"
                defaultValue={contact?.complement}
                register={register("complement")}
              />
            </div>
          </div>
          <div className="flex gap-y-8">
            <InputsEdit
              className="inputbox"
              label={"Bairro:"}
              type="text"
              id="district"
              defaultValue={contact?.district}
              register={register("district")}
            />
            <InputsEdit
              className="inputbox"
              label={"Cidade:"}
              type="text"
              id="locality"
              defaultValue={contact?.locality}
              register={register("locality")}
            />
            <InputsEdit
              className="inputbox"
              label={"Estado (UF):"}
              type="text"
              id="state"
              defaultValue={contact?.state}
              register={register("state")}
            />
          </div>

          <div className="flex gap-x-3">
            <ButtonNav
              width="70%"
              height="4.8rem"
              type="submit"
              text="Salvar"
              background="color-grey-1"
              textcolor="color-grey-0"
              hover="color-grey-2"
              onClick={handleSubmit(onSubmit)}
              disabled={false}
            />
            <ButtonNav
              width="9.8rem"
              height="4.8rem"
              type="button"
              text="Excluir"
              background="color-color-primary-disable"
              textcolor="white"
              hover="color-grey-2"
              onClick={() =>
                handleDelete({
                  params: { contactId: String(contact?.id) },
                })
              }
              data-contact-id={String(contact?.id)}
              disabled={false}
            />
          </div>
        </form>
      </div> 
    </div>
  );
};
