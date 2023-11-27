// 'useViaCepService'...
"use client";
import { useViaCepService } from "@/app/services/useViaCep.service";
import Inputs from "../components/fragments/inputs/Inputs";
import React, { useState } from "react";
import { Contact } from "@/app/services/request/contact.request/contact.request";
import { IContactForm } from "../components/Form/contactForm/ContactForm";

interface IAddress {
  name: string;
  email: string;
  phone: string;
  street: string;
  complement: string;
  zipCode: string;
  district: string;
  locality: string;
  state: string;
}

export const AddressForm: React.FC<{}> = () => {
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
  const [manualInput, setManualInput] = useState(false);

  const getAddress = useViaCepService();
  const fetchAddress = async (cep: string) => {
    try {
      const response = await getAddress(cep);
      setAddress({
        ...address,
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

  const handleBlur = (value: string) => {
    if (!manualInput) {
      fetchAddress(value);
    }
  };

  const handleBuscarCepClick = () => {
    fetchAddress(address.zipCode);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Objeto enviado pelo formulário:", address);
    console.log('name', typeof address.name);
    console.log('district', typeof address.district);
    
    Contact(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Inputs
          label="Nome:"
          htmlFor="name"
          type="text"
          id="name"
          onBlur={(e) => handleBlur(e.target.value)}
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
        />
        <Inputs
          label="Email:"
          htmlFor="email"
          type="text"
          id="email"
          onBlur={(e) => handleBlur(e.target.value)}
          value={address.emails[0].email}
          onChange={(e) =>
            setAddress({ ...address, emails: [{ email: e.target.value }] })
          }
        />

        <Inputs
          label="Telefone:"
          htmlFor="phone"
          type="text"
          id="phone"
          onBlur={(e) => handleBlur(e.target.value)}
          value={address.phones[0].telephone}
          onChange={(e) =>
            setAddress({ ...address, phones: [{ telephone: e.target.value }] })
          }
        />
        <Inputs
          label="Cep:"
          htmlFor="zipCode"
          type="text"
          id="zipCode"
          onBlur={(e) => handleBlur(e.target.value)}
          value={address.zipCode}
          style={{ width: "100px" }}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
        />
        <button type="button" onClick={handleBuscarCepClick}>
          Buscar CEP
        </button>
      </div>
      <Inputs
        label="Rua:"
        htmlFor="street"
        type="text"
        id="street"
        value={address.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
      />
      <Inputs
        label="Numero:"
        htmlFor="complement"
        type="text"
        id="complement"
        onBlur={(e) => handleBlur(e.target.value)}
        value={address.complement}
        onChange={(e) => setAddress({ ...address, complement: e.target.value })}
      />
      <Inputs
        label="Bairro:"
        htmlFor="district"
        type="text"
        id="district"
        value={address.district}
        onChange={(e) => setAddress({ ...address, district: e.target.value })}
      />
      <Inputs
        label="Cidade:"
        htmlFor="locality"
        type="text"
        id="locality"
        value={address.locality}
        onChange={(e) => setAddress({ ...address, locality: e.target.value })}
      />
      <Inputs
        label="Estado:"
        htmlFor="state"
        type="text"
        id="state"
        value={address.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
