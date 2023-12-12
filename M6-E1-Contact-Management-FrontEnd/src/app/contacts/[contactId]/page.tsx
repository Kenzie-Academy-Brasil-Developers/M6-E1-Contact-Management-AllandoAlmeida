"use client";
import {
  isTokenExpired,
  updateToken,
} from "@/service/session.service";
import { api } from "@/service/api";
import { TCurrentContact } from "./contact.service/@type.contact";
import { UpdatingContact } from "../../../components/forms/UpdatingContactForm";
import { Slide, toast } from "react-toastify";
import { useEffect, useState } from "react";

export interface IContactParams {
  params: {
    contactId: string;
  };
}

async function getContactById(contactId: string) {
  const accessToken = localStorage
    .getItem("@Management:accessToken")
    ?.replace(/"/g, "");

  if (accessToken) {
    const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));

    if (await isTokenExpired()) {
      const updatedToken = await updateToken();

      if (!updatedToken) {
        console.error("Falha ao atualizar o token");
        throw new Error("Falha ao atualizar o token");
      }
    }

    const customerId = accessTokenData.sub;
    console.log("customerId:", customerId);

    if (!customerId) throw new Error("Customer not found!");

    try {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await api.get(`contacts/${contactId}`);

      console.log("response contact", response);

      if (response.status === 200) {
        toast.success("Contato Registrado com sucesso", {
          transition: Slide,
          autoClose: 2000,
        });
        return response.data; // Adicionei o retorno dos dados do contato
      } else {
        console.error("Erro:", response.statusText);
        return null;
      }
    } catch (error) {
      toast.error("Ops! Cadastro não concluído.", {
        transition: Slide,
        autoClose: 2000,
      });
      return null;
    }
  }
}

const ContactParams = ({ params }: IContactParams) => {
  const { contactId } = params;
  const [currentContact, setCurrentContact] = useState<TCurrentContact | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData: TCurrentContact = await getContactById(contactId);
        setCurrentContact(contactData);
      } catch (error) {
        console.error("Erro ao obter dados do contato:", error);
      }
    };

    fetchData();
  }, [contactId]);

  console.log("currentContact", currentContact);

  return (
    <main>
      <ul>
        <li>
          {currentContact && (
            <UpdatingContact
              currentContact={currentContact}
              name={currentContact.name}
              zipCode={currentContact.zipCode}
              street={currentContact.street}
              complement={currentContact.complement}
              district={currentContact.district}
              locality={currentContact.locality}
              state={currentContact.state}
              telephone={currentContact.telephone}
              email={currentContact.email}
            />
          )}
        </li>
      </ul>
    </main>
  );
};
export default ContactParams;
