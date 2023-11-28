import { Slide, toast } from "react-toastify";
import { API_BASE_URL, api } from "../../api";
import { IContactResponse } from "./@type.contact";
import { IContactForm } from "@/app/components/Form/contactForm/@type.contactForm";

export async function newContact(data: IContactForm) {
  /*
  const contactData = {
    ...data,
    phones: data.phones.map((phone) => ({ telephone: phone.telephone })),
    emails: data.emails.map((email) => ({ email: email.email })),
  };
  const contactTest = {
    complement: "563",
    district: "Limoeiro",
    emails: [{ email: "teste@teste.com" }],
    locality: "São Paulo",
    name: "testesteste",
    phones: [{ telephone: "1194771111" }],
    state: "SP",
    street: "Rua Elza Soares de Arruda",
    zipCode: "08051360",
  };

  //Contact(contactData);
  //reset();

  /*  */
  const accessToken = localStorage
    .getItem("@ContactManagement:accessToken")
    ?.replace(/"/g, "");
  const customerId = localStorage.getItem("@ContactManagement:id");

  if (!customerId) throw new Error("Customer not found!");
  try {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.post("/contacts", data);
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
    toast.error("Ops! Cadastro não concluido.", {
      transition: Slide,
      autoClose: 2000,
    });
    return null;
  }
}
