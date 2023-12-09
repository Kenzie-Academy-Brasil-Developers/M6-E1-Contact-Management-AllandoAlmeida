// CardContact.tsx
'use client'
import { IContact } from "@/app/customers/page";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";

interface CardContactProps {
  key: string;
  contact: IContact;
}

export const CardContact: React.FC<CardContactProps> = ({ key, contact }) => {
  const windowWidth = useWindowWidth();
  const showOnlyName = windowWidth <= 1024;

  if (!contact || !contact.id) {
    return <div>Dados de contato indisponíveis</div>;
  }

  console.log('CardContact', contact.id)

  return (
    <div className="flex flex-row mt-1 h-[5rem] gap-2 border-b-[0.02rem]  border-gray-700 text-[2rem] hover:border-b-[0.05rem] flex-wrap">
      <ul className="w-[95%] grid grid-cols-3 items-center">
        <li
          className={`${
            showOnlyName ? "col-span-3 text-lg" : "col-span-1/2 px-10 text-2xl"
          }`}
        >
          {contact.name || "Nome não disponível"}
        </li>
        {!showOnlyName && (
          <>
            <ul>
              <li className="text-2xl">{contact.telephone}</li>
              
            </ul>

            <ul>
              <li className="text-2xl">
                <a href={`mailto:${contact.email}`} className="text-2xl">{contact.email}</a>
                
                </li>
            </ul>
          </>
        )}
      </ul>
      <Link href={`/contacts/${contact.id}`} className="flex items-center ">
        <EditeIcon />
      </Link>
    </div>
  );
};
