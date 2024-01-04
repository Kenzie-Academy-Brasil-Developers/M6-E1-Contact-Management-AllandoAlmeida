// CardProfile.tsx

import React from "react";
import Link from "next/link";
import { CustomerContactData } from "@/schema/customer.schema";
import { GiGears } from "react-icons/gi";

export const CardProfile = ({ ...customer }: CustomerContactData) => {
  const firstLetter = customer?.name.charAt(0);
  <span className="text-white font-poppins text-17 font-semibold flex items-center justify-center w-9 h-9 rounded-full bg-yellow-500">
    {firstLetter}
  </span>;
  if (!customer) {
    return <div>Dados do cliente indisponíveis</div>;
  }

  return (
    <div className="flex justify-between items-center bg-blue-600 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent rounded-xl w-[95%] md:w-[95%] px-5 h-[6rem] m-5">
      <div className="flex gap-4 items-center ">
        <span className="text-red font-poppins text-[2rem] font-extrabold flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent">
          {firstLetter}
        </span>
        <span className="text-[1.4rem] font-extrabold">
          {customer.name || "Nome não disponível"}
        </span>
      </div>
      <Link href={`/customers/${customer.id}`} className="flex items-center">
        <GiGears className="w-14 h-14 fill-gray-300"/>
      </Link>
    </div>
  );
};

export default CardProfile;

/* 
 border-gray-600 flex justify-center items-center rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent

 "flex justify-between items-center backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent  w-[95%] md:w-[95%] px-5 h-[5rem] border-2"

*/
