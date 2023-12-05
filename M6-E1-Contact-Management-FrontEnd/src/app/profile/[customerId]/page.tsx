"use client";
import React, { useEffect, useState } from "react";
import { UpdatingCustomer } from "./UpdatingCustomer";
import { TCustomerProfile, fetchProfile } from "../service/profile.service";

const CustormerParams = () => {
  const [customer, setCustomer] = useState<TCustomerProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCustomer = await fetchProfile();
        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <ul>
        <li>{customer && <UpdatingCustomer customer={customer} />}</li>
      </ul>
    </main>
  );
};

export default CustormerParams;
