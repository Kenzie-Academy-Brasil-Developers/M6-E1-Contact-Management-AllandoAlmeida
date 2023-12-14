import { UpdatingContactForm } from "@/components/forms/UpdatingContactForm";
import Header from "@/components/header/Header";
import { useContact } from "@/contexts/contactContext";
import { TContactParams } from "@/schema/contact.schema";

const ContactParams = async ({ params }: TContactParams) => {

  const { fetchContactParams } = useContact()

  const contact = await fetchContactParams({ params });

  return (
    <main>
      <Header/>
      
        <UpdatingContactForm contact={contact}/>
   
    </main>
  );
};
export default ContactParams;
