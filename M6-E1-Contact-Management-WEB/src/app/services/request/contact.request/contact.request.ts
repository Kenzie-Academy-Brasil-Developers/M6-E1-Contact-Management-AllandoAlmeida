import { Slide, toast } from "react-toastify";
import { API_BASE_URL, api } from "../../api";
import { IContactResponse } from "./@type.contact";
import { IContactForm } from "@/app/components/Form/contactForm/@type.contactForm";

export async function Contact(
  data: IContactForm
) {
  console.log("data", data);
  try {
    const body = {
      name: data.name,
      zipCode: data.zipCode,
      street: data.street,
      complement: data.complement,
      district: data.district,
      locality: data.locality,
      state: data.state,
      phones: { ...data.phones },
      emails: { ...data.emails },
    };
    console.log("body", body);

    const accessToken = localStorage
      .getItem("@ContactManagement:accessToken")
      ?.replace(/"/g, "");
    const customerId = localStorage.getItem("@ContactManagement:id");

    if (!customerId) throw new Error("Customer not found!");

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      userId: customerId,
    };
    if (customerId) {
      headers.userId = customerId;
    }

    /*  const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)

    });
 */
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.post("/contacts", body);
    console.log("response", response);
    if (response.status === 201) {
      toast.success("Contato Registrado com sucesso", {
        transition: Slide,
        autoClose: 2000,
      });
    } else {
      console.error("Erro:", response.statusText);
      return null;
    }
  } catch (error) {
    toast.error("Ocorreu um erro ao tentar se cadastrar.", {
      transition: Slide,
      autoClose: 2000,
    });
    return null;
  }
}
