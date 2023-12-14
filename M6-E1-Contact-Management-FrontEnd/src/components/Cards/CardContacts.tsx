import { CustomerContactData } from "@/schema/customer.schema";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";
import { ContactData } from "@/schema/contact.schema";

export const CardContact = ({ customer }: CustomerContactData) => {
  console.log("cardContacts", customer?.contacts);

  return (
    <section className="flex flex-col mt-1 h-[5rem] gap-1 border-b-[0.02rem]  border-gray-700 text-[2rem] hover:border-b-[0.05rem] flex-wrap">
      {customer &&
        customer.contacts.map((contact: ContactData) => (
          <ul key={contact.contact.id} >
            <li className="w-10 text-xl">
              <Link
                id={contact.contact.id}
                href={`/contacts/${contact.contact.id}`}
                className="flex items-center "
              >
                <EditeIcon />
              </Link>
            </li>
            <li>{contact.contact.name}</li>
            <li>{contact.contact.telephone}</li>
            <li>{contact.contact.email}</li>
          </ul>
        ))}
    </section>
  );
};


/* // CardContact.tsx
"use client";
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

  return (
    <div className="flex flex-row mt-1 h-[5rem] gap-1 border-b-[0.02rem]  border-gray-700 text-[2rem] hover:border-b-[0.05rem] flex-wrap">
      <ul className="w-full flex gap-1 h-[5rem] items-center ">
        <li className="w-10 text-xl">
          <Link href={`/contacts/${contact.id}`} className="flex items-center ">
            <EditeIcon />
          </Link>
        </li>
        <li className={`${showOnlyName ? "w-3/4 bg-yellow-200 text-xl" : "w-35"} `}>{contact.name}</li>
        {!showOnlyName && (
          <>
            <li className="w-35 bg-blue-200 text-xl">{contact.email}</li>
            <li className="w-20 bg-green-200 text-xl">{contact.telephone}</li>
          </>
        )}
      </ul>
    </div>
  );
};

 */