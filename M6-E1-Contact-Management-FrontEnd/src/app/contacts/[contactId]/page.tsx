import {
   UpdatingContactForm,
} from "@/components/forms/UpdatingContactForm";
import Header from "@/components/header/Header";
import { fetchContactParams } from "@/contexts/contactContext";
import { fetchCustomer } from "@/contexts/customerContext";
import { TContactParams } from "@/schema/contact.schema";



const ContactParams = async ({ params }: TContactParams) => {
  const currentContact = await fetchContactParams({ params });
  const customer = await fetchCustomer();

  return (
    <main>
      <Header customer={customer} />
      {currentContact && (
        <UpdatingContactForm
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
    </main>
  );
};
export default ContactParams;
