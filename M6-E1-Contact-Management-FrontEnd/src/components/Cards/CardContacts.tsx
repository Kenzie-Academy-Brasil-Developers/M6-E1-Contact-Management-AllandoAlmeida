// CardContact.tsx
'use client'
import { ContactType } from "@/app/profile/service/profile.service";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";

interface ICardContact {
  contact: ContactType;
}

export const CardContact: React.FC<ICardContact> = ({ contact }) => {
  const windowWidth = useWindowWidth();
  const showOnlyName = windowWidth <= 1024;

  if (!contact || !contact.contact) {
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
          {contact.contact.name || "Nome não disponível"}
        </li>
        {!showOnlyName && (
          <>
            <ul>
              <li className="text-2xl">{contact.contact.telephone}</li>
              
            </ul>

            <ul>
              <li className="text-2xl">
                <a href={`mailto:${contact.contact.email}`} className="text-2xl">{contact.contact.email}</a>
                
                </li>
            </ul>
          </>
        )}
      </ul>
      <Link href={`/contacts/${contact.contact.id}`} className="flex items-center ">
        <EditeIcon />
      </Link>
    </div>
  );
};
