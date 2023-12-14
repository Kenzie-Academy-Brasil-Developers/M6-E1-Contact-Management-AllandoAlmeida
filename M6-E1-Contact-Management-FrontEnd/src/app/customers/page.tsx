import { Footer } from "@/components/footer/Footer";
import { CreateItemsIcon } from "@/components/icons/CreateItemsIcon";
import Link from "next/link";
import { CardContact } from "@/components/Cards/CardContacts";
import { fetchCustomer } from "@/contexts/customerContext";
import Header from "@/components/header/Header";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import { CustomerContactData } from "@/schema/customer.schema";



const Customer = async () => {
  await verifyAccessToken();
  

  const customer = await fetchCustomer();

  console.log('customer', customer?.contacts)

  return (
    <main className="flex items-center justify-center">
      <Header />
      <section className="container profile-Container w-[95vw] m-auto md:w-[60vw] md:h-[80vh] md:gap-x-10 flex-wrap mt-[12rem] md:mt-0">
        <div className="flex justify-center items-end backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent  w-[95%] md:w-[95%] px-5 h-[8rem] flex-col">
          <Link href={"/contacts"}>
            <CreateItemsIcon />
          </Link>
        </div>
        {customer && <CardContact customer={customer} />}
      </section>
      <Footer />
    </main>
  );
};

export default Customer;



/* 
import { Footer } from "@/components/footer/Footer";
import { CreateItemsIcon } from "@/components/icons/CreateItemsIcon";
import Link from "next/link";
import { Key } from "react";
import { CardContact } from "@/components/Cards/CardContacts";
import { fetchCustomer } from "@/contexts/customerContext";
import Header from "@/components/header/Header";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import { ContactData } from "@/schema/contact.schema";

export interface IContact {
  id: string;
  name: string;
  zipCode: string;
  street: string;
  complement: string;
  district: string;
  locality: string;
  state: string;
  telephone: string;
  email: string;
}



const Customer = async () => {
  await verifyAccessToken()

  const customer = await fetchCustomer();
  
  return (
    <main className="flex items-center justify-center">
      <Header customer={customer?.customer? customer.customer : undefined} />
      <section className="container profile-Container w-[95vw] m-auto md:w-[60vw] md:h-[80vh] md:gap-x-10 flex-wrap mt-[12rem] md:mt-[3rem]">
        <div className="border-2 border-gray-600">
          <div className="w-10/10">
          </div>
        </div>
        <div className="border-2 border-gray-600 flex justify-center items-end rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent w-[90%] md:w-[95%] px-5 h-[5rem] flex-col">
          <Link href={"/contacts"}>
            <CreateItemsIcon />
          </Link>
        </div>
        <div className="flex flex-col w-[95%] h-[90vh] md:h-[88%]">
          <ul className="grid grid-cols-3 justify-between  h-14 bg-black bg-opacity-50">
            <li className="flex ml-10 items-center w-3/3 text-2xl  ">Nome</li>
            <li className="flex ml-5 items-center w-3/3 h-14 text-2xl ">
              Telefone
            </li>
            <li className="flex ml-5 items-center w-3/3 h-14 text-2xl ">
              E-mail
            </li>
          </ul>

          <div className="w-10/10 mt-10 overflow-x-auto text-lg">
            {customer?.contacts?.map((contactItem: ContactData) => (
              <CardContact
                key={contactItem.id}
                contact={contactItem.contact}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer login={true} />
    </main>
  );
};

export default Customer;
 */