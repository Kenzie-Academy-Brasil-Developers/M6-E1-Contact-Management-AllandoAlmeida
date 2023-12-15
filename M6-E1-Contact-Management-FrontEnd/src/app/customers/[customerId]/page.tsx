"use client";
import React, { useEffect, useState } from "react";
import { UpdatingCustomerForm } from "../../../components/forms/UpdatingCustomerForm";
import Header from "@/components/header/Header";
import { useCustomer } from "@/contexts/customerContext";
import { CustomerParams } from "@/schema/customer.schema";

const CustomerParams = ({ params }: CustomerParams) => {

  const {fetchCustomerParams} = useCustomer()
  const [data, setData] = useState<
    | {
        customer: {
          id: string;
          name: string;
          telephone: string;
          email: string;
        } | null;
      }
    | undefined
  >();
  

  const fetchData = async () => {
    try {
      const fetchedData = await fetchCustomerParams({ params });
    
      setData(fetchedData!);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     <Header />
      <section>
        <UpdatingCustomerForm customer={data} />
      </section>
    </main>
  );
};

export default CustomerParams;
