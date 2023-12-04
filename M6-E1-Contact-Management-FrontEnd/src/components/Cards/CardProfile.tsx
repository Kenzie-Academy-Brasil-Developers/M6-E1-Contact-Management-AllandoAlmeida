// CardProfile.tsx

import React from "react";
import { CustomerType } from "@/app/profile/service/profile.service";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";

interface ICardProfile {
  customer: {
    id: string;
    username: string;
    name: string;
    phones: { id: string; telephone: string }[];
    emails: { id: string; email: string }[];
    isActive: string;
  };
}

export const CardProfile: React.FC<ICardProfile> = ({ customer }) => {
  if (!customer) {
    return <div>Dados do cliente indisponíveis</div>;
  }

  const renderPhones = () => {
    if (!customer.phones || customer.phones.length === 0) {
      return <li>Nenhum telefone disponível</li>;
    }

    return customer.phones.map((phone) => (
      <li key={phone.id}>{phone.telephone || "Telefone não disponível"}</li>
    ));
  };

  const renderEmails = () => {
    if (!customer.emails || customer.emails.length === 0) {
      return <li>Nenhum email disponível</li>;
    }

    return customer.emails.map((email) => (
      <li key={email.id}>{email.email || "Email não disponível"}</li>
    ));
  };

  return (
    <section className="md:flex md:flex-col ">
    <div className="h-[5rem] border-b-2 border-white-700">
      <ul className="flex flex-col text-2xl justify-around  mt-1 h-[3rem] gap-2 ">
        <li className="text-2xl">Nome:{customer.name || "Nome não disponível"}</li>
        <li className="text-2xl">Username: {customer.username || "Username não disponível"}</li>
      </ul>
    </div>

    <div>
    <Link href={`/profile/${customer.id}`} className="flex items-center">
      <span className="flex items-center gap-x-1 font-bold h-[5rem]">
        <EditeIcon/>
        <span className="text-lg">MEUS DADOS</span>

      </span>
      </Link>
    </div>

    </section>

  );
};

export default CardProfile;


/* <div>
      <ul className="flex flex-col text-2xl justify-around  mt-1 h-[3rem] gap-2 border-b-2 border-white-700">
        <li>Nome:{customer.name || "Nome não disponível"}</li>
        <li>Username: {customer.username || "Username não disponível"}</li>
        <li>Ativo: {customer.isActive ? "Sim" : "Não"}</li>

        {/* Telefones do Cliente */
       /*  <li>Telefones do Cliente:</li>
        <li>{renderPhones()}</li> */

        {/* Emails do Cliente */}
        {/* <li>Emails do Cliente:</li>
        <li>{renderEmails()}</li>
      </ul>
    </div>  */}