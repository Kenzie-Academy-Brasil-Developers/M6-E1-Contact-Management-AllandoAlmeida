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

const Profile: React.FC = () => {
  const [data, setData] = useState<{
    customer: CustomerType;
    contacts?: ContactType[] | undefined;
  } | null>(null);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchProfile();
      console.log("Customer:", fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const windowWidth = useWindowWidth();
  const showOnlyName = windowWidth <= 426;

  return (
    <main className="flex items-center justify-center">
      <section className="container profile-Container w-[80vw] md:h-[80vh] md:gap-x-10 flex-wrap">
        <div className="profile-Container-contacts md:w-2/12 h-[90%]">
          <div className="w-[90%]">
            {data && <CardProfile customer={data} />}
          </div>
        </div>
        <div className="profile-Container-contacts w-[80vw] md:w-9/12 h-full md:h-[90%] ">
          <div className="flex flex-col w-[90%] h-[90vh] md:h-[88%]">
          <div className="flex items-end flex-col h-[5rem] mb-[2rem] ">
            <Link href={"/contacts"} ><CreateItemsIcon/></Link>
          </div>
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
        </div>
      </section>
    </main>
  );
};

export default Profile;
