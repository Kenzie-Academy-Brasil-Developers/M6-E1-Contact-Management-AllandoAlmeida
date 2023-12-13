"use server";
import { Slide, toast } from "react-toastify";
import { api } from "../service/api";
import { jwtDecode } from "jwt-decode";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import { ContactData, DeepPartialContactData, TContactParams } from "@/schema/contact.schema";


export const fetchContact = async (data: ContactData) => {
  const accessToken = await verifyAccessToken();
  const decodedToken = jwtDecode(accessToken);
  const customerId: string = decodedToken.sub ?? "";

  if (!customerId) throw new Error("Customer not found!");
  try {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.post("/contacts", data);

    if (response.status === 201) {
      if (typeof window !== 'undefined') {
        toast.success("Customer updated successfully", {
          transition: Slide,
          autoClose: 2000,
        });
      }
    } else {
      console.error("Erro:", response.statusText);
      return null;
    }
  } catch (error) {
    if (typeof window !== 'undefined') {
      toast.error("Ops! Cadastro não concluído.", {
        transition: Slide,
        autoClose: 2000,
      });
    }
    return null;
  }
};

export const fetchContactParams = async ({ params }: TContactParams) => {

  const accessToken = await verifyAccessToken();
  try {
    const contactId = params.contactId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.get(`/contacts/${contactId}`);

    if (response.status === 200) {
      const contact = response.data as ContactData & { isActive: string };
      
      return contact;
    } else {
      console.error("Error:", response.statusText);
      return null;
    }
  } catch (error) {
    console.log("Oops! Customer retrieval failed.", error);
    return null;
  }
}

export const upDateContactParams = async (
  { params }: TContactParams,
  data: DeepPartialContactData
) => {
  const accessToken = await verifyAccessToken();
  try {
    const contactId = params.contactId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.patch(`contacts/${contactId}`, data);
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

export const deleteContactParams = async ({ params }: TContactParams) => {

  const accessToken = await verifyAccessToken();
  try {
    const contactId = params.contactId;
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.delete(`contacts/${contactId}`);
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

