// 'useViaCepService'...
"use client";
import { useViaCepService } from "@/app/services/useViaCep.service";
import Inputs from "../fragments/inputs/Inputs";
import React, { useState } from "react";

const AddressForm: React.FC = () => {
  const getAddress = useViaCepService();
  const [address, setAddress] = useState({
    zipCode: "",
    street: "",
    district: "",
    locality: "",
    state: "",
  });
  const [manualInput, setManualInput] = useState(false);

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
      // Trate o erro conforme necessário, como exibir uma mensagem para o usuário.
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
    // Aqui você pode enviar os dados do endereço para a API
    console.log("Endereço enviado:", address);
  };

  return (
    <form method="get" action="." onSubmit={handleSubmit}>
      <div >
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

export default AddressForm;
