import { CustomerContactData } from "@/schema/customer.schema";
import Link from "next/link";
import { EditeIcon } from "../icons/EditeIcon";
import { ContactData } from "@/schema/contact.schema";

export const CardContact = ({ contacts }: { contacts: Array<ContactData> }) => {
  console.log("CardContact", contacts);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="w-full grid grid-cols-3 lg:grid-cols-6 gap-5 items-center justify-start flex-row mt-1 h-[5.3rem] border-b-[0.02rem] border-gray-700 text-[2rem] flex-wrap transition ease-in-out duration-300"
        >
          <div className="col-start-1 lg:w-1/4 text-xl">
            <Link
              id={contact.id}
              href={`/contacts/${contact.id}`}
              className="flex items-center"
            >
              <EditeIcon />
            </Link>
          </div>
          <div className="col-start-2 w-4/4 lg:col-start-2 lg:col-span-2">
            {contact.name}
          </div>
          <div className="hidden lg:block col-start-4 col-end-4 ">
            {contact.telephone}
          </div>
          <div className="hidden lg:block col-start-6 col-span-6 ">
            {contact.email}
          </div>
        </div>
      ))}
      <ul>
        <li>teste</li>
      </ul>
    </div>
  );
};
