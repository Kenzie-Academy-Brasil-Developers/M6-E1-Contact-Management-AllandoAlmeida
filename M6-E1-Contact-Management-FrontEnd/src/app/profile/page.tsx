// pages/profile.tsx
// pages/profile.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchProfile } from "./service/profile.service";
import useDashStore from "@/components/fragments/context/DashStore";
import { CardContact, ContactType } from "@/components/Cards/CardContacts";
import { CardProfile } from "@/components/Cards/CardProfile";


// eslint-disable-next-line @next/next/no-async-client-component
function Profile() {
  const [customer, setCustomer] = useState(null);
  console.log("Customer", customer);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const tokenWithQuotes = localStorage.getItem("@Management:accessToken");
        console.log("tokenWithQuotes", tokenWithQuotes);

        if (tokenWithQuotes) {
          const token = tokenWithQuotes.replace(/"/g, "");
          const accessTokenData = JSON.parse(atob(token.split(".")[1]));
          console.log("accessTokenData", accessTokenData);
          const userId = accessTokenData.sub;
          console.log("userId", userId);

          const data = await fetchProfile(userId);
          console.log("data", data);

          if (data) {
            setCustomer(data);
          } else {
            console.error("Dados do perfil não encontrados");
          }
        }
      } catch (error) {
        console.error("Erro durante o carregamento do perfil:", error);
      }
    };

    loadProfile();
  }, []);

  const { options, setSelectedOption } = useDashStore();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedOptionContent, setSelectedOptionContent] =
    useState<React.ReactNode | null>(null);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu === selectedMenu ? null : menu);
    setSelectedOptionContent(null);
  };

  const handleIndicateClick = (optionContent: React.ReactNode) => {
    setSelectedOptionContent(optionContent);
  };

  const handleFinancialClick = (optionContent: React.ReactNode) => {
    setSelectedOptionContent(optionContent);
  };

  return (
    <div className="profile-Container w-[95vw] h-[95vh] gap-x-10" >
      <div className="profile-Container-menu w-2/12 h-[90%]">
        {customer && <CardProfile key={customer.id} customer={customer} />}
      </div>
      <div className="profile-Container-contacts w-9/12 h-[90%]">
        <div>
        {customer?.contacts?.map((contact: ContactType) => (
          <CardContact key={contact.id} contact={contact} />
        ))}

        </div>
      </div>
    </div>
  );
  
  
}


export default Profile;

/* 
 <main>
      <div className="profile-Container w-[95vw] h-[95vh] gap-x-10">
        <div className="profile-Container-menu w-2/12 h-[90%]">
          {customers && <CardProfile customers={customers} />}
        </div>
        <div className="profile-Container-contacts w-9/12 h-[90%]">
          {customers && <CardContact customers={customers} />}
        </div>
      </div>
  </main>
*/
