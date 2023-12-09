/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { TFormCurrentContact } from "./@type.formEditContact";
import {
  deleteContactById,
  upDateContact,
} from "../../app/contacts/[contactId]/contact.service/contact.service";
import InputsEdit from "@/components/fragments/InputsEdit";
import { ButtonNav } from "../ButtonNav";
import { useRouter } from "next/navigation";

export const UpdatingContact: React.FC<TFormCurrentContact> = ({
  currentContact,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<any> = useForm();

  const router = useRouter()

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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (data: any) => {

    const contactId = String(currentContact.id);

    if (contactId) {
      try {
        await upDateContact(contactId, data);
       
        setIsEditing(false);
        router.push('/customers')
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
        router.push('/customers')
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    reset();
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
              isEditing={isEditing}
              register={register("name")}
            />

            <InputsEdit
              defaultValue={currentContact.email}
              className="inputbox"
              label={"E-mail:"}
              type="text"
              id="email"
              isEditing={isEditing}
              register={register("email")}
            />
            <div>
              <InputsEdit
                defaultValue={currentContact.telephone}
                className="inputbox"
                label={"Contato"}
                type="text"
                id="telephone"
                isEditing={isEditing}
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
              isEditing={isEditing}
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
                isEditing={isEditing}
                register={register("street")}
              />
              <InputsEdit
                className="inputbox"
                label={"Numero:"}
                type="text"
                id="complement"
                defaultValue={currentContact.complement}
                isEditing={isEditing}
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
              isEditing={isEditing}
              register={register("district")}
            />
            <InputsEdit
              className="inputbox"
              label={"Cidade:"}
              type="text"
              id="locality"
              defaultValue={currentContact.locality}
              isEditing={isEditing}
              register={register("locality")}
            />
            <InputsEdit
              className="inputbox"
              label={"Estado (UF):"}
              type="text"
              id="state"
              defaultValue={currentContact.state}
              isEditing={isEditing}
              register={register("state")}
            />
          </div>

          <div>
            <ButtonNav
              width="70%"
              height="4.8rem"
              type="submit"
              text={isEditing ? "Salvar" : "Editar"}
              background="color-grey-1"
              textcolor="color-grey-0"
              hover="color-grey-2"
              onClick={async (e) => {
                if (isEditing) {
                  await handleSubmit(handleSave)();
                } else {
                  toggleEditing();
                }
              }}
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
