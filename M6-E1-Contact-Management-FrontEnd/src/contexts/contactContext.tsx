import { api } from "../service/api";
import {
  ContactData,
  CurrentContactData,
  DeepPartialContactData,
  TContactParams,
} from "@/schema/contact.schema";
import { ReactNode, createContext, useContext } from "react";
import Toast from "@/components/toast";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

interface ContactProviderData {
  fetchContact: (contactData: ContactData) => void;
  fetchContactParams: (contactParams: TContactParams) => Promise<CurrentContactData | undefined>;
  upDateContactParams: (
    contactParams: TContactParams,
    data: DeepPartialContactData
  ) => void;
  deleteContactParams: (contactParams: TContactParams) => void;
}

const ContactContext = createContext<ContactProviderData>(
  {} as ContactProviderData
);

export const ContactProvider = ({ children }: Props) => {
  const router = useRouter();

  const fetchContact = async (data: ContactData) => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");


      const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/"/g, "");
        const accessTokenData = JSON.parse(atob(token.split(".")[1]));

        const userId = accessTokenData.sub;


        if (!userId) throw new Error("Customer not found!");

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const response = await api.post("/contacts", data);


        if (response.status === 201) {
          if (typeof window !== "undefined") {
            Toast({
              message: "Cadastro realizado com sucesso",
              isSucess: true,
            });
          }
        } else {
          console.error("Erro:", response.statusText);
          return null;
        }
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return null;
    }
  };

  const fetchContactParams = async ({ params }: TContactParams):Promise<CurrentContactData | undefined> => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");
   
      const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/"/g, "");
        const accessTokenData = JSON.parse(atob(token.split(".")[1]));

        const userId = accessTokenData.sub;
 

        if (!userId) throw new Error("Customer not found!");

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const contactId = params.contactId;
        const response = await api.get(`/contacts/${contactId}`);

        if (response.status === 200) {
          const contact = response.data as CurrentContactData & { isActive: string };

          return contact;
        } else {
          console.error("Error:", response.statusText);
          return undefined;
        }
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return undefined;
    }
  };

  const upDateContactParams = async (
    { params }: TContactParams,
    data: DeepPartialContactData
  ) => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");     

      const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/"/g, "");
        const accessTokenData = JSON.parse(atob(token.split(".")[1]));

        const userId = accessTokenData.sub;


        if (!userId) throw new Error("Customer not found!");

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const contactId = params.contactId;
        const response = await api.patch(`contacts/${contactId}`, data);
        if (response.status === 200) {
          if (typeof window !== "undefined") {
            Toast({
              message: "Cadastro atualizado com sucesso",
              isSucess: true,
            });
          }
        } else {
          console.error("Erro:", response.statusText);
          return null;
        }
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return { error };
    }
  };

  const deleteContactParams = async ({ params }: TContactParams) => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");

      const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/"/g, "");
        const accessTokenData = JSON.parse(atob(token.split(".")[1]));

        const userId = accessTokenData.sub;


        if (!userId) throw new Error("Customer not found!");

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const contactId = params.contactId;
        const response = await api.delete(`contacts/${contactId}`);
        if (response.status === 204) {
          if (typeof window !== "undefined") {
            Toast({
              message: "Operação realizada com sucesso",
              isSucess: true,
            });
          }
        } else {
          console.error("Erro:", response.statusText);
          return null;
        }
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return { error };
    }
  };
  return (
    <ContactContext.Provider
      value={{
        fetchContact,
        fetchContactParams,
        upDateContactParams,
        deleteContactParams,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
