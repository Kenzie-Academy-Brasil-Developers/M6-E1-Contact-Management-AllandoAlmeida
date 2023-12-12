// CardProfile.tsx

import React from "react";
import { EditeIcon } from "../icons/EditeIcon";
import Link from "next/link";
import { TCustomerProfile } from "@/service/profile.service";


export const CardProfile: React.FC<TCustomerProfile> = ({ customer }) => {
  if (!customer) {
    return <div>Dados do cliente indisponíveis</div>;
  }

  return (
    <section className="w-[80vw] px-6">
      <ul className="flex flex-col gap-y-2 ">
        <span className="text-[1rem] text-gray-700">Nome:</span>
        <span className="text-[1.2rem]">
          {customer.name || "Nome não disponível"}
        </span>
      </ul>

      <div>
        <Link href={`/customers/${customer.id}`} className="flex items-center">
          <span className="flex items-center gap-x-1 font-bold h-[5rem]">
            <EditeIcon />
            <span className="text-lg">MEUS DADOS</span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CardProfile;
