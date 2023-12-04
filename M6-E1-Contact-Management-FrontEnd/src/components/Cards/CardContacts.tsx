// CardContact.tsx
'use client'
import { ContactType } from "@/app/profile/service/profile.service";
import { Key, useEffect, useState } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";

interface ICardContact {
  contact: ContactType;
}

export const CardContact: React.FC<ICardContact> = ({ contact }) => {
  const windowWidth = useWindowWidth();
  const showOnlyName = windowWidth <= 800;

  if (!contact || !contact.contact) {
    return <div>Dados de contato indisponíveis</div>;
  }

  console.log('CardContact', contact.id)

  return (
    <div className="flex mt-1 h-[5rem] gap-2 border-b-[0.02rem]  border-gray-700 text-[2rem] hover:border-b-[0.05rem] flex-wrap">
      <ul className="w-[95%] grid grid-cols-3 items-center">
        <li
          className={`${
            showOnlyName ? "col-span-3 text-lg" : "col-span-1 px-10 text-2xl"
          }`}
        >
          {contact.contact.name || "Nome não disponível"}
        </li>
        {!showOnlyName && (
          <>
            <ul>
              {contact.contact.phones?.map(
                (phone: { id: Key | null | undefined; telephone: any }) => (
                  <li key={phone.id} className="col-span-1 px-10  text-2xl">
                    {phone.telephone || "Telefone não disponível"}
                  </li>
                )
              )}
            </ul>

            <ul>
              {contact.contact.emails?.map(
                (email: { id: Key | null | undefined; email: any }) => (
                  <li className="col-span-3 px-10 text-2xl" key={email.id}>
                    <a
                      href={`mailto:${email.email}`}
                      className="text-red-500 hover:underline text-2xl"
                    >
                      {email.email || "Email não disponível"}
                    </a>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </ul>
      <Link href={`/contacts/${contact.contact.id}`} className="flex items-center">
        <EditeIcon />
      </Link>
    </div>
  );
};
