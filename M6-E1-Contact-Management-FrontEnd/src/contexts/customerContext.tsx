

import { Slide, toast } from "react-toastify";
import { API_BASE_URL, api } from "../service/api";
import { jwtDecode } from "jwt-decode";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import {
  CustomerContactData,
  CustomerData,
  DeepPartialCustomerContactData,
  TCustomerParams,
} from "@/schema/customer.schema";



export const fetchCustomer = async () => {


  const accessToken = await verifyAccessToken();
  const decodedToken = jwtDecode(accessToken);

  try {
    const userId: string = decodedToken.sub ?? "";

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.get(`/customers/${userId}`);
    if (response.status === 200) {
      const customer = response.data as CustomerContactData;

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

export const fetchCustomerParams = async ({ params }: TCustomerParams) => {
  const accessToken = await verifyAccessToken();
  try {
    const customerId = params.customerId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.get(`/customers/${customerId}`);
    if (response.status === 200) {
      const customer = response.data as CustomerData & { isActive: string };

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
  const accessToken = await verifyAccessToken();
  try {
    const customerId = params.customerId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.patch(`customers/${customerId}`, data);
    if (response.status === 200) {
      if (typeof window !== "undefined") {
        toast.success("Customer updated successfully", {
          transition: Slide,
          autoClose: 2000,
        });
      }
    } else {
      console.error("Error:", response.statusText);
      return { error: response.statusText };
    }
  } catch (error) {
    if (typeof window !== "undefined") {
      toast.error("Oops! Customer update failed.", {
        transition: Slide,
        autoClose: 2000,
      });
    }
    return { error };
  }
};

export const deleteCustomerParams = async ({ params }: TCustomerParams) => {
  const accessToken = await verifyAccessToken();
  try {
    const customerId = params.customerId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.delete(`/customers/${customerId}`);
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
