"use client";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Inputs from "../../inputs/Inputs";
import { useState } from "react";
import { IContactForm } from "./@type.contactForm";
import { useViaCepService } from "../../../services/useViaCep.service";
import { Button } from "@/components/ui/button"
import { newContact } from "@/services/requests/contact.request/contact.request";
import { IContact } from "@/services/requests/contact.request/@type.contact";


interface IFormValues extends IContact{
  manualInput: boolean;
}


export const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  }: UseFormReturn<IFormValues> = useForm<IFormValues>();

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
      setAddress({
        ...getValues(),
        zipCode: cep,
        street: response.street,
        district: response.district,
        locality: response.locality,
        state: response.state,
        name: getValues().name || "",
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      await newContact(data);
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="items-center justify-center">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          htmlFor={"name"}
          type={"text"}
          label={"Nome"}
          placeholder={"Digite nome do contato"}
          {...register("name")}
          error={errors.name}
        />
        <div className="flex">
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
        </div>

        <section>
          <h2 className="font-bold text-xl">Endereço</h2>

          <div className="flex items-end">
            <Inputs
              label="Cep:"
              htmlFor="zipCode"
              type="text"
              id="zipCode"
              value={address.zipCode}
              placeholder={"Digite o CEP"}
              onBlur={(e) => handleBlur(e.target.value)}
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  zipCode: e.target.value,
                }))
              }
            />
            <Button
              type="button"
              className="block w-[100px] h-[40px] rounded-md bg-indigo-600 px-3.5 py-2.5 my-2 text-center text-[0.7rem] font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              onClick={handleBuscarCepClick}
            >
              Buscar Cep
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Inputs
              label="Rua:"
              htmlFor="street"
              type="text"
              id="street"
              value={address.street}
              placeholder={"Digite o endereço"}
              {...register("street", { value: address.street })}
              error={errors.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <Inputs
              label="Numero:"
              htmlFor="complement"
              type="text"
              id="complement"
              placeholder={"Número"}
              {...register("complement")}
              error={errors.complement}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Inputs
              label="Bairro:"
              htmlFor="district"
              type="text"
              id="district"
              value={address.district}
              placeholder={"Digite o Bairro"}
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
              placeholder={"Cidade"}
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
              placeholder={"UF"}
              error={errors.state}
              onChange={(e) => reset({ ...getValues(), state: e.target.value })}
            />
          </div>
        </section>

        <Button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar
        </Button>
       
      </form>
    </div>
  );
};
