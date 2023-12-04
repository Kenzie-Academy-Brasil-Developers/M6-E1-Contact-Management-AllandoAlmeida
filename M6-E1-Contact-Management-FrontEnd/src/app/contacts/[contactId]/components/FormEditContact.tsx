"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import InputsEdit from "@/components/fragments/InputsEdit";
import { TFormCurrentContac } from "./@type.formEditContact";
import { ButtonNav } from "./ButtonDel";
import {
  deleteContactById,
  upDateContact,
} from "../contact.service/contact.service";

export const FormEditContact: React.FC<TFormCurrentContac> = ({
  currentContact,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<any> = useForm();

  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    fetchAddress();
  }, [currentContact]);

  const fetchAddress = () => {
    try {
     
      setValue("street", currentContact.street || "");
      setValue("complement", currentContact.complement || "");
      setValue("zipCode", currentContact.zipCode || "");
      setValue("district", currentContact.district || "");
      setValue("locality", currentContact.locality || "");
      setValue("state", currentContact.state || "");
  
      
      setValue("phones", Array.isArray(currentContact.phones) ? currentContact.phones : []);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (data: any) => {
    console.log("Salvar:", data);

    const contactId = String(currentContact.id);

    if (contactId) {
      try {
        await upDateContact(contactId, data);
        reset(contactId);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const handleDelete = async (contactId: string) => {
    console.log("Excluir", contactId);

    if (contactId) {
      try {
        await deleteContactById(contactId);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    reset(data);
  };

  return (
    <div className="w-full h-[50rem] flex flex-col">
      <div className="box flex-col w-[35rem]">
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
          <div className="flex flex-col gap-y-8">
            <InputsEdit
              value={currentContact.name}
              className="inputbox"
              label={"Nome Contato:"}
              type="text"
              id="name"
              isEditing={isEditing}
              {...register("name")}
            />

            <InputsEdit
              value={currentContact.emails?.[0]?.email || ""}
              className="inputbox"
              label={"E-mail:"}
              type="email"
              id="emails"
              isEditing={isEditing}
              {...(Array.isArray(currentContact.emails) && currentContact.emails.length > 0
                ? register("emails.0.emals")
                : {})}
            />
            <div>
              <InputsEdit
                value={currentContact.phones?.[0]?.telephone || ""}
                className="inputbox"
                label={"Telefone:"}
                type="text"
                id="phones"
                isEditing={isEditing}
                {...(Array.isArray(currentContact.phones) && currentContact.phones.length > 0
                  ? register("phones.0.telephone")
                  : {})}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <InputsEdit
              value={currentContact.zipCode}
              className="inputbox"
              label={"CEP:"}
              type="text"
              id="zipCode"
              isEditing={isEditing}
              placeholder={currentContact.zipCode}
              {...register("zipCode")}
            />
            <div className="flex gap-y-8">
              <InputsEdit
                className="inputbox"
                label={"Rua:"}
                type="text"
                id="street"
                value={currentContact.street}
                isEditing={isEditing}
                {...register("street")}
              />
              <InputsEdit
                className="inputbox"
                label={"Numero:"}
                type="text"
                id="complement"
                value={currentContact.complement}
                isEditing={isEditing}
                {...register("complement")}
              />
            </div>
          </div>
          <div className="flex gap-y-8">
            <InputsEdit
              className="inputbox"
              label={"Bairro:"}
              type="text"
              id="district"
              value={currentContact.district}
              isEditing={isEditing}
              {...register("district")}
            />
            <InputsEdit
              className="inputbox"
              label={"Cidade:"}
              type="text"
              id="locality"
              value={currentContact.locality}
              isEditing={isEditing}
              {...register("locality")}
            />
            <InputsEdit
              className="inputbox"
              label={"Estado (UF):"}
              type="text"
              id="state"
              value={currentContact.state}
              isEditing={isEditing}
              {...register("state")}
            />
          </div>

          <div className="flex gap-x-3">
            <ButtonNav
              width="70%"
              height="4.8rem"
              type="submit"
              text={isEditing ? "Salvar" : "Editar"}
              background="color-grey-1"
              textcolor="color-grey-0"
              hover="color-grey-2"
              onClick={() =>
                isEditing ? handleSubmit(handleSave)() : toggleEditing()
              }
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
              onClick={() => handleDelete(String(currentContact.id))}
              data-contact-id={String(currentContact.id)}
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
