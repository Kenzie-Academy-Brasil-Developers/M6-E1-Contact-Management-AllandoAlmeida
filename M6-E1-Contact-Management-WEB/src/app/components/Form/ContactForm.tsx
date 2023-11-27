"use client";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../fragments/inputs/Inputs";
import { useViaCepService } from "@/app/services/useViaCep.service";
import { useState } from "react";
import { Contact, IContact } from "@/app/services/request/contact.request";

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

export const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  }: UseFormReturn<IContact> = useForm<IContact>();

  const [address, setAddress] = useState({
    zipCode: "",
    street: "",
    district: "",
    locality: "",
    state: "",
  });

  const getAddress = useViaCepService();
  const fetchAddress = async (cep: string) => {
    try {
      const response = await getAddress(cep);
      reset({
        ...getValues(),
        zipCode: cep,
        street: response.street,
        district: response.district,
        locality: response.locality,
        state: response.state,
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleBuscarCepClick = () => {
    fetchAddress(getValues().zipCode);
  };

  const handleBlur = (value: string) => {
    if (!getValues().manualInput) {
      fetchAddress(value);
    }
  };

  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    const contactData = {
      ...data,
      phones: data.phones.map((phone) => ({ telephone: phone.telephone })),
      emails: data.emails.map((email) => ({ email: email.email })),
    };

    
    Contact(contactData);
    //reset();
  };

  return (
    <div className="container">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          htmlFor={"name"}
          type={"text"}
          label={"Nome"}
          placeholder={"Digite nome do contato"}
          {...register("name")}
          error={errors.name}
        />
        <Inputs
          htmlFor={""}
          type={"email"}
          label={"E-mail"}
          placeholder={"Digite seu e-mail"}
          {...register("emails.0.email")}
          error={errors.emails?.[0]?.email}
        />
        <Inputs
          htmlFor={""}
          type={"email"}
          label={"E-mail"}
          placeholder={"Digite seu e-mail"}
          {...register("emails.0.email")}
          error={errors.emails?.[0]?.email}
        />
        <Inputs
          htmlFor={""}
          type={"text"}
          label={"Telefone"}
          placeholder={"Digite seu telefone"}
          {...register("phones.0.telephone")}
          error={errors.phones?.[0]?.telephone}
        />
        <Inputs
          htmlFor={""}
          type={"text"}
          label={"Telefone"}
          placeholder={"Digite seu telefone"}
          {...register("phones.0.telephone")}
          error={errors.phones?.[0]?.telephone}
        />

        <section>
          <h2 className="font-bold text-xl">Endereço</h2>

          <div className="flex gap-2 items-end">
            <Inputs
              label="Cep:"
              htmlFor="zipCode"
              type="text"
              id="zipCode"
              value={address.zipCode}
              style={{ width: "100px" }}
              onBlur={(e) => handleBlur(e.target.value)}
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  zipCode: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="block w-[100px] h-[40px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-[0.7rem] font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              onClick={handleBuscarCepClick}
            >
              Buscar Cep
            </button>
          </div>
          <Inputs
            label="Rua:"
            htmlFor="street"
            type="text"
            id="street"
            value={address.street}
            {...register("street", { value: address.street })}
            error={errors.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <Inputs
            label="Numero:"
            htmlFor="complement"
            type="text"
            id="complement"
            {...register("complement")}
            error={errors.complement}
          />
          <Inputs
            label="Bairro:"
            htmlFor="district"
            type="text"
            id="district"
            value={address.district}
            {...register("district", { value: address.district })}
            error={errors.district}
            onChange={(e) =>
              setAddress({ ...address, district: e.target.value })
            }
          />
          <Inputs
            label="Cidade:"
            htmlFor="locality"
            type="text"
            id="locality"
            value={address.locality}
            {...register("locality", { value: address.locality })}
            error={errors.locality}
            onChange={(e) =>
              setAddress({ ...address, locality: e.target.value })
            }
          />

          <Inputs
            label="Estado:"
            htmlFor="state"
            type="text"
            id="state"
            {...register("state")}
            error={errors.state}
            onChange={(e) => reset({ ...getValues(), state: e.target.value })} // Troque values por getValues()
          />
        </section>

        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
