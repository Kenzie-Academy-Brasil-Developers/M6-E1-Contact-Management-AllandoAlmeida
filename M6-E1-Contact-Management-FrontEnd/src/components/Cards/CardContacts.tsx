import { CustomerContactData } from "@/schema/customer.schema";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";
import { ContactData } from "@/schema/contact.schema";

export const CardContact = ({ customer }: CustomerContactData) => {
  console.log("cardContacts", customer?.contacts);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {customer &&
        customer.contacts.map((contact: ContactData) => (
          <ul
            key={contact.contact.id}
            className="w-full grid gri-cols-3 md:grid-cols-6 gap-5 items-center justify-start flex-row mt-1 h-[5.3rem] border-b-[0.02rem] border-gray-700 text-[2rem] flex-wrap transition ease-in-out duration-300"
          >
            <li className="col-start-1 md:w-1/4 text-xl">
              <Link
                id={contact.contact.id}
                href={`/contacts/${contact.contact.id}`}
                className="flex items-center"
              >
                <EditeIcon />
              </Link>
            </li>
            <li className="col-start-2 w-4/4 md:col-start-2 md:col-span-2">{contact.contact.name}</li>
            <li className="hidden md:block col-start-4 col-end-4 ">
              {contact.contact.telephone}
            </li>
            <li className="hidden lg:block col-start-6 col-span-6 ">{contact.contact.email}</li>
          </ul>
        ))}
    </div>
  );
};
