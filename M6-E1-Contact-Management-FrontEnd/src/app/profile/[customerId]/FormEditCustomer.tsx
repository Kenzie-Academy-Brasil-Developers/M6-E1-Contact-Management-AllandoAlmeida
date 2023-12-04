/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/icons/CloseIcon";
import InputsEdit from "@/components/fragments/InputsEdit";
import {
  deleteCustomerById,
  upDateCustomerById,
} from "./service/customer.service";
import { ICustomerProfile } from "../service/profile.service";
import { ButtonNav } from "@/app/contacts/[contactId]/components/ButtonDel";

export const FormEditCustomer: React.FC<ICustomerProfile> = ({ customer }) => {
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
  }, [customer]);

  const fetchAddress = () => {
    try {
      setValue("name", customer.name || "");
      setValue("username", customer.username || "");
      setValue("phones", customer.phones || "");
      setValue("emails", customer.emails || "");

      setValue("phones", Array.isArray(customer.phones) ? customer.phones : []);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (data: any) => {
    console.log("Salvar:", data);

    const contactId = String(customer.id);

    if (contactId) {
      try {
        await upDateCustomerById(contactId, data);
        reset(contactId);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const handleDelete = async (customerId: string) => {
    console.log("Excluir", customerId);

    if (customerId) {
      try {
        await deleteCustomerById(customerId);
      } catch (error) {
        console.error("Error deleting customer:", error);
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
              value={customer.name}
              className="inputbox"
              label={"Nome Contato:"}
              type="text"
              id="name"
              isEditing={isEditing}
              {...register("name")}
            />

            <InputsEdit
              value={customer.emails?.[0]?.email || ""}
              className="inputbox"
              label={"E-mail:"}
              type="emails"
              id="emails"
              isEditing={isEditing}
              {...(Array.isArray(customer.emails) && customer.emails.length > 0
                ? register("emails.0.emals")
                : {})}
            />
            <div>
              <InputsEdit
                value={customer.phones?.[0]?.telephone || ""}
                className="inputbox"
                label={"Telefone:"}
                type="text"
                id="phones"
                isEditing={isEditing}
                {...(Array.isArray(customer.phones) &&
                customer.phones.length > 0
                  ? register("phones.0.telephone")
                  : register("phones.telephone"))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            <InputsEdit
              value={customer.username}
              className="inputbox"
              label={"username:"}
              type="text"
              id="username"
              isEditing={isEditing}
              placeholder={customer.username}
              {...register("username")}
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
              onClick={() => handleDelete(String(customer.id))}
              data-contact-id={String(customer.id)}
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
