"use client";
import { Footer } from "@/components/footer/Footer";
import { CreateItemsIcon } from "@/components/icons/CreateItemsIcon";
import Link from "next/link";
import Header from "@/components/header/Header";
import { useCustomer } from "@/contexts/customerContext";
import { useEffect, useState } from "react";
import { CardContact } from "@/components/Cards/CardContacts";
import CardProfile from "@/components/Cards/CardProfile";
import { EditeIcon } from "@/components/icons/EditeIcon";

const Customer = () => {
  const { fetchCustomer } = useCustomer();
  const [data, setData] = useState<{
    customer?: {
      id: string;
      username: string;
      name: string;
      telephone: string;
      email: string;
      isActive: boolean;
      contacts: {
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
      };
    };
  } | null>(null);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchCustomer();
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
    <main className="flex items-center justify-center">
      <Header />
      <section className="container profile-Container w-[95vw] m-auto md:w-[60vw] h-[80vh] md:gap-x-10 flex-wrap md:mt-0">
        <CardProfile customer={data}/>
        <div className="flex justify-between items-center backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent  w-[95%] md:w-[95%] px-5 h-[5rem] ">
          <h1 className="text-3xl font-extrabold">Contatos</h1>
          <Link href={"/contacts"}>
            <CreateItemsIcon />
          </Link>
        </div>
        <div className="flex flex-col w-[90%] h-[70%] mb-[5rem]">
          <CardContact customer={data} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Customer;
