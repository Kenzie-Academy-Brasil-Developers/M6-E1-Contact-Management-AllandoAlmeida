"use client";
import React, { useEffect, useState } from "react";
import { UpdatingCustomer } from "./UpdatingCustomer";
import { TCustomerProfile, fetchProfile } from "../service/profile.service";

const CustormerParams = () => {
  const [customer, setCustomer] = useState<{
    customer: TCustomerProfile;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCustomer = await fetchProfile();
        console.log("Customer:", fetchedCustomer);
        setCustomer({ customer: fetchedCustomer });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    // Chame a função fetchData para que ela seja executada
    fetchData();
  }, []);

  return (
    <main>
      <ul>
        <li>{customer && <UpdatingCustomer customer={customer.customer} contacts={{
          id: "",
          name: "",
          zipCode: "",
          street: "",
          complement: "",
          district: "",
          locality: "",
          state: "",
          telephone: "",
          email: ""
        }} />}</li>
      </ul>
    </main>
  );
};

export default CustormerParams;
