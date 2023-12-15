import Toast from "@/components/toast";
import { api } from "../service/api";
import {
  CurrentCustomerData,
  CustomerContactData,
  CustomerData,
  CustomerParams,
  DeepPartialCustomerContactData,
  ICustomerType,
} from "@/schema/customer.schema";
import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

interface CustomerProviderData {
  fetchCustomer: () => Promise<CustomerContactData | undefined>;
  fetchCustomerParams: (customerParams: CustomerParams) => Promise<CurrentCustomerData | undefined>;
  upDateCustomerParams: (
    customerParams: CustomerParams,
    data: DeepPartialCustomerContactData
  ) => void;
  deleteCustomerParams: (customerParams: CustomerParams) => void;
}

const CustomerContext = createContext<CustomerProviderData>(
  {} as CustomerProviderData
);
export const CustomerProvider = ({ children }: Props) => {
  const router = useRouter();

  const fetchCustomer = async (): Promise<CustomerContactData | undefined> => {
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
        const response = await api.get(`/customers/${userId}`);

        if (response.status === 200) {
          const customer = response.data as CustomerContactData;
          return customer;
        } else {
          console.error("Error:", response.statusText);
          return undefined;
        }
      }
    } catch (error) {
      console.log("Oops! Customer retrieval failed.", error);
      return undefined;
    }
  };

  const fetchCustomerParams = async ({ params }: CustomerParams):Promise<CurrentCustomerData | undefined> => {
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
      const customerId = params.customerId ;
      const response = await api.get(`/customers/${customerId}`);

      if (response.status === 200) {
        const customer = response.data as CurrentCustomerData & { isActive: string };

        return customer;
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


  const upDateCustomerParams = async (
    { params }: CustomerParams,
    data: DeepPartialCustomerContactData
  ) => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const customerId = params.customerId;
      const response = await api.patch(`customers/${customerId}`, data);
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
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return { error };
    }
  };

  const deleteCustomerParams = async ({ params }: CustomerParams) => {
    try {
      const accessToken = localStorage
        .getItem("@Management:accessToken")
        ?.replace(/"/g, "");
 
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const customerId = params.customerId;
      const response = await api.delete(`/customers/${customerId}`);
      if (response.status === 204) {
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
    } catch (error) {
      if (typeof window !== "undefined") {
        Toast({ message: "Opa! Algo deu errado" });
        router.push("/customers");
      }
      return { error };
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        fetchCustomer,
        fetchCustomerParams,
        upDateCustomerParams,
        deleteCustomerParams,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
