/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UseFormReturn, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CloseIcon } from "../icons/CloseIcon";
import InputsEdit from "../fragments/InputsEdit";
import { ButtonNav } from "../ButtonNav";
import { useCustomer } from "@/contexts/customerContext";
import { CustomerParams, ICustomerType } from "@/schema/customer.schema";


export interface ICustomerUpdate {
  customer: {
    id: string | null;
    username: string;
    name: string;
    telephone: string;
    email: string;
    isActive: string;
  };
}

export const UpdatingCustomerForm = ({ customer }: ICustomerUpdate) => {


  const {upDateCustomerParams,deleteCustomerParams } = useCustomer();
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<any> = useForm();

  useEffect(() => {
    fetchAddress();
  }, [customer]);

  const fetchAddress = () => {
    try {
      setValue("name", customer.name || "");
      setValue("username", customer.username || "");
      setValue("telephone", customer.telephone || "");
      setValue("email", customer.email || "");
      setValue(
        "telephone",
        typeof customer.telephone === "string" ? customer.telephone : ""
      );

      setValue(
        "email",
        typeof customer.email === "string" ? customer.email : ""
      );
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleSave = async (data: any) => {
    const customerId = String(customer.id);

    if (customerId) {
      try {
        await upDateCustomerParams({ params: { customerId } }, data);
        router.push("/customers");
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const handleDelete = async ({ params }: CustomerParams) => {
    if (params) {
      try {
        await deleteCustomerParams({ params });
        router.push("/customers");
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    } else {
      console.error("ID do contato não encontrado");
    }
  };

  const onSubmit = async (data: ICustomerType) => {
    await handleSave(data);
  };

  return (
    <div className="w-full flex flex-col border-2">
      <div className="box flex-col w-[35rem]">
        <div className="flex w-[100%] items-center mt-[2rem] justify-between p-7">
          <h1 className="text-[2.5rem]">Meus Dados</h1>
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
              defaultValue={customer?.name}
              className="inputbox"
              label={"Nome Contato:"}
              type="text"
              id="name"
              register={register("name")}
            />

            <InputsEdit
              defaultValue={customer?.email}
              className="inputbox"
              label={"E-mail:"}
              type="email"
              id="email"
              register={register("email")}
            />
            <div>
              <InputsEdit
                defaultValue={customer?.telephone}
                className="inputbox"
                label={"Telefone:"}
                type="text"
                id="telephone"
                register={register("telephone")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            <InputsEdit
              defaultValue={customer?.username}
              className="inputbox"
              label={"username:"}
              type="text"
              id="username"
              placeholder={customer?.username}
              register={register("username")}
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
                handleDelete({ params: { customerId: String(customer?.id) } })
              }
              data-contact-id={String(customer?.id)}
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
