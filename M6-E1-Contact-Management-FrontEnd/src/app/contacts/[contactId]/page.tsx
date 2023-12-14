'use client'
import { UpdatingContactForm } from "@/components/forms/UpdatingContactForm";
import Header from "@/components/header/Header";
import { useContact } from "@/contexts/contactContext";
import { CurrentContactData, CurrentContactSchema, TContactParams } from "@/schema/contact.schema";
import { useEffect, useState } from "react";

const ContactParams = ({ params }: TContactParams) => {

  const { fetchContactParams } = useContact();

  const [contact, setContact] = useState<CurrentContactData | null>

  useEffect(() => {
    const getContact = async () => {
      try {
        const fetchedContact = await fetchContactParams({ params });
        setContact(fetchedContact);
      } catch (error) {
        console.error("Erro ao buscar contato:", error);
      }
    };

    getContact();
  }, [fetchContactParams, params]);

  return (
    <main>
      <Header />
      {contact && <UpdatingContactForm contact={contact} />}
    </main>
  );
};

export default ContactParams;