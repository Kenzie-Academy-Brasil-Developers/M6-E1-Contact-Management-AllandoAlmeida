'use client';
import React, { useEffect, useState } from 'react';
import { FormEditCustomer } from './FormEditCustomer';
import { ICustomerProfile, fetchProfile } from '../service/profile.service';


const CustormerParams = () => {
  const [customer, setCustomer] = useState<{
    customer: ICustomerProfile;
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
      <div className="w-[90%]">
        {customer && <FormEditCustomer customer={customer.customer} />}
      </div>
    </main>
  );
};

export default CustormerParams;
