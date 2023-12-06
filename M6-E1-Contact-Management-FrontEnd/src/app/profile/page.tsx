"use client";

import React, { useState, useEffect } from "react";
import {
  fetchProfile,
  CustomerType,
  ContactType,
} from "@/app/profile/service/profile.service";
import { CardContact } from "@/components/Cards/CardContacts";
import CardProfile from "@/components/Cards/CardProfile";
import { useWindowWidth } from "@/components/hooks/useWindowWidth";
import { CreateItemsIcon } from "@/components/icons/CreateItemsIcon";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";

const Profile: React.FC = () => {
  const [data, setData] = useState<{
    customer: CustomerType;
    contacts?: ContactType[] | undefined;
  } | null>(null);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchProfile();
     
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  const windowWidth = useWindowWidth();
  const showOnlyName = windowWidth <= 800;

  return (
    <main className="flex items-center justify-center">
      <section className="container profile-Container w-[95vw] m-auto md:w-[60vw] md:h-[80vh] md:gap-x-10 flex-wrap mt-[12rem] md:mt-[3rem]">
        {/* <div className="border-2 border-gray-600">
          <div className="w-10/10">
            {data && <CardProfile customer={data} />}
          </div>
        </div> */}
        {/* <div className="border-2 border-gray-600 flex justify-center items-center rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent w-[90%] md:w-[95%] h-full md:h-[100%] flex-col"> */}
          <div className="border-2 border-gray-600 flex justify-center items-end rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent w-[90%] md:w-[95%] px-5 h-[5rem] justify-start flex-col">
            <Link href={"/contacts"} ><CreateItemsIcon/></Link>
          </div>
          <div className="flex flex-col w-[95%] h-[90vh] md:h-[88%]">
            {!showOnlyName && (
              <ul className="grid grid-cols-3 justify-between  h-14 bg-black bg-opacity-50">
                <li className="flex ml-10 items-center w-3/3 text-2xl  ">
                  Nome
                </li>
                <li className="flex ml-5 items-center w-3/3 h-14 text-2xl ">
                  Telefone
                </li>
                <li className="flex ml-5 items-center w-3/3 h-14 text-2xl ">
                  E-mail
                </li>
              </ul>
            )}
            <div className="w-10/10  mt-10 overflow-x-auto text-lg">
              {data?.contacts?.map((contact: ContactType) => (
                <CardContact key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        {/* </div> */}
      </section>
      <Footer login={true}/>
    </main>
  );
};

export default Profile;
