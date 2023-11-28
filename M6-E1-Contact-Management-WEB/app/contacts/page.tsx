'use client'

import { CustomToastContainer } from "../components/CustomToastContainer/CustomToastContainer";
import { ContactForm } from "../components/Form/contactForm/ContactForm";


export default async function Contacts() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ContactForm />
      <CustomToastContainer />

    </main>
  );
}
