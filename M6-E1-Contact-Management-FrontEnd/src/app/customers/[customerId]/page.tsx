"use client";
import React, { useEffect, useState } from "react";
import { ICustomerUpdate, UpdatingCustomerForm } from "../../../components/forms/UpdatingCustomerForm";
import Header from "@/components/header/Header";
import { useCustomer } from "@/contexts/customerContext";
import { CustomerParams } from "@/schema/customer.schema";

const CustomerParams = ({ params }: CustomerParams) => {

  const {fetchCustomerParams} = useCustomer()
  const [data, setData] = useState<{
    id: string;
    name: string;
    username: string;
    telephone: string;
    email: string;
    isActive: boolean;
  } | undefined>();
  

  const fetchData = async () => {
    try {
      const fetchedData = await fetchCustomerParams({ params });
    
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     <Header />
      <section>
      {data && <UpdatingCustomerForm {...data} />}
      </section>
    </main>
  );
};

export default CustomerParams;
