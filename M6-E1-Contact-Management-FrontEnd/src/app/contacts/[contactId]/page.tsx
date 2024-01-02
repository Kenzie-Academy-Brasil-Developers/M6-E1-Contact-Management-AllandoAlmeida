"use client";
import { UpdatingContactForm } from "@/components/forms/UpdatingContactForm";
import Header from "@/components/header/Header";
import { useContact } from "@/contexts/contactContext";
import { TContactParams } from "@/schema/contact.schema";
import { useEffect, useState } from "react";

const ContactParams = ({ params }: TContactParams) => {
  const { fetchContactParams } = useContact();
  const [data, setData] = useState<{
    id: string;
    name: string;
    telephone: string;
    email: string;
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    locality: string;
    state: string;
  } | undefined>();

  const fetchData = async () => {
    try {
      const fetchedData = await fetchContactParams({ params });

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
      {data && <UpdatingContactForm {...data} />}
      </section>
    </main>
  );
};
export default ContactParams;
