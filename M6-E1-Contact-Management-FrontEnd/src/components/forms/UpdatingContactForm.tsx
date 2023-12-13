/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { TFormCurrentContact } from "./@type.formEditContact";
import InputsEdit from "@/components/fragments/InputsEdit";
import { ButtonNav } from "../ButtonNav";
import { useRouter } from "next/navigation";
import {
  deleteContactParams,
  upDateContactParams,
} from "@/contexts/contactContext";
import { IContactType, TContactParams } from "@/schema/contact.schema";

export const UpdatingContactForm: React.FC<TFormCurrentContact> = ({
  currentContact,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<any> = useForm();

  const router = useRouter();

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
      setValue("telephone", currentContact.telephone || "");
      setValue("email", currentContact.email || "");

      setValue(
        "telephone",
        typeof currentContact.telephone === "string"
          ? currentContact.telephone
          : ""
      );

      setValue(
        "email",
        typeof currentContact.email === "string" ? currentContact.email : ""
      );
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleSave = async (data: any) => {
    const contactId = String(currentContact.id);

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
    <div className="w-full h-[50rem] flex flex-col">
      <div className="box flex-col w-[35rem]">
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
          <div className="flex flex-col gap-y-8">
            <InputsEdit
              defaultValue={currentContact.name}
              className="inputbox"
              label={"Nome Contato:"}
              type="text"
              id="name"
              register={register("name")}
            />

            <InputsEdit
              defaultValue={currentContact.email}
              className="inputbox"
              label={"E-mail:"}
              type="text"
              id="email"
              register={register("email")}
            />
            <div>
              <InputsEdit
                defaultValue={currentContact.telephone}
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
              defaultValue={currentContact.zipCode}
              className="inputbox"
              label={"CEP:"}
              type="text"
              id="zipCode"
              placeholder={currentContact.zipCode}
              register={register("zipCode")}
            />
            <div className="flex gap-y-8">
              <InputsEdit
                className="inputbox"
                label={"Rua:"}
                type="text"
                id="street"
                defaultValue={currentContact.street}
                register={register("street")}
              />
              <InputsEdit
                className="inputbox"
                label={"Numero:"}
                type="text"
                id="complement"
                defaultValue={currentContact.complement}
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
              defaultValue={currentContact.district}
              register={register("district")}
            />
            <InputsEdit
              className="inputbox"
              label={"Cidade:"}
              type="text"
              id="locality"
              defaultValue={currentContact.locality}
              register={register("locality")}
            />
            <InputsEdit
              className="inputbox"
              label={"Estado (UF):"}
              type="text"
              id="state"
              defaultValue={currentContact.state}
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
                  params: { contactId: String(currentContact.id) },
                })
              }
              data-contact-id={String(currentContact.id)}
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
