"use server";

import { Slide, toast } from "react-toastify";
import { API_BASE_URL, api } from "../service/api";
import { jwtDecode } from "jwt-decode";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import { CustomerContactData, CustomerData, DeepPartialCustomerContactData, TCustomerParams } from "@/schema/customer.schema";



interface CustomerProviderData {
  upDateCustomerParams: (
    { params }: TCustomerParams,
    data: DeepPartialCustomerContactData
  ) => Promise<null | undefined>;
  deleteCustomerParams: (customerParams: TCustomerParams) => void;
  fetchCustomer: () => Promise<CustomerContactData | null>;

  fetchCustomerParams: ({
    params,
  }: TCustomerParams) => Promise<CustomerContactData | null>;
}



  export const fetchCustomer = async () => {
    const accessToken = await verifyAccessToken();
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
  };

  export const fetchCustomerParams = async ({ params }: TCustomerParams) => {
    console.log("params", params);

    const accessToken = await verifyAccessToken();
    console.log("accessToken", accessToken);
    try {
      const customerId = params.customerId;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await api.get(`/customers/${customerId}`);

      console.log("response customer", response);
      if (response.status === 200) {
        const customer = response.data as CustomerData & { isActive: string };
        console.log("customer", customer);
        
        return customer;
      } else {
        console.error("Error:", response.statusText);
        return null;
      }
    } catch (error) {
      console.log("Oops! Customer retrieval failed.", error);
      return null;
    }
  };

  export const upDateCustomerParams = async (
    { params }: TCustomerParams,
    data: DeepPartialCustomerContactData
  ) => {
    console.log('params', params)
    console.log('upDateCustomerParams', data)
    const accessToken = await verifyAccessToken();
    console.log('accessToken', accessToken)
    try {
      const customerId = params.customerId;
      console.log(customerId);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await api.patch(`customers/${customerId}`, data);
      console.log(response.data);

      console.log("response customer", response);
      if (response.status === 200) {
        if (typeof window !== 'undefined') {
          toast.success("Customer updated successfully", {
            transition: Slide,
            autoClose: 2000,
          });
        }
      } else {
        console.error("Error:", response.statusText);
        return { error: response.statusText }; // Retorna informação de erro
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        toast.error("Oops! Customer update failed.", {
          transition: Slide,
          autoClose: 2000,
        });
      }
      return { error }; // Retorna informação de erro
    }
  };

  export const deleteCustomerParams = async ({ params }: TCustomerParams) => {
    console.log("params", params);

    const accessToken = await verifyAccessToken();
    console.log("accessToken", accessToken);
    try {
      const customerId = params.customerId;
      console.log(customerId);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await api.delete(`/customers/${customerId}`);

      console.log("response customer", response);
      if (response.status === 204) {
        toast.success("Customer deleted successfully", {
          transition: Slide,
          autoClose: 2000,
        });
        return response.data;
      } else {
        console.error("Error:", response.statusText);
        return null;
      }
    } catch (error) {
      console.log("Oops! Customer deletion failed.", error);
      return null;
    }
  };

 
