import { jwtDecode } from "jwt-decode";
import { verifyToken } from "@/session/verifyToken";
import { API_BASE_URL, api } from "@/service/api";

export interface TCustomerProfile {
  customer: {
    id: string | null;
    username: string;
    name: string;
    telephone: string;
    email: string;
    isActive: string;
    contacts: {
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
    }[];
  };
}

export async function fetchCustomer() {
  const accessToken = await verifyToken();
  const decodedToken = jwtDecode(accessToken);
  const userId: string = decodedToken.sub ?? "";

  const response = await fetch(`${API_BASE_URL}/customers/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const customer = await response.json();
    return customer;
  }

  return null;
}

export interface TCustomerParams {
  params: { customerId: string };
}

const revalidate = 90;

export const fetchCustomerParams = async ({ params }: TCustomerParams) => {
  console.log("params", params);

  const accessToken = await verifyToken();
  console.log("accessToken", accessToken);
  try {
    const customerId = params.customerId;
    console.log(customerId);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.get(`/customers/${customerId}`);

    console.log("response contact", response);
    if (response.status === 200) {
      const customer = response.data;
      console.log("customer", customer);
      return customer;
    } else {
      console.error("Erro:", response.statusText);
      return null;
    }
  } catch (error) {
    console.log("Ops! Cadastro não concluído.", error);
    return null;
  }
};
