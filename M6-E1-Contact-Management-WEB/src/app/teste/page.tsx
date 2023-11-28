
import { ContactForm } from "../../components/forms/contactForm/ContactForm";
import { api } from "../../services/api";
import { ICustomers } from "./@type.teste";


async function getCustomers() {
  try {
    const { data } = await api.get<ICustomers[]>("/customers");
    return data;
  } catch (error) {
    return null;
  }
}
export default async function Teste() {
  const newList = await getCustomers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ContactForm/>
      <div className="flex flex-col items-center justify-center">
        {newList?.map((currenteNew) => (
          <li key={currenteNew.id}>
            <h1>{currenteNew.name}</h1>
            <h3>{currenteNew.isActive ? "Ativo" : "Inativo"}</h3>
            {currenteNew.phones.length > 0 && (
              <div>
                <h3>Phones:</h3>
                {currenteNew.phones.map((phone) => (
                  <p key={phone.id}>{phone.telephone}</p>
                ))}
              </div>
            )}

            {currenteNew.emails.length > 0 && (
              <div>
                <h3>Emails:</h3>
                {currenteNew.emails.map((email) => (
                  <p key={email.id}>{email.email}</p>
                ))}
              </div>
            )}

            {currenteNew.contacts.length > 0 && (
              <div>
                <h3>Contacts:</h3>
                {currenteNew.contacts.map((contact) => (
                  <p key={contact.id}>{contact.name}</p>
                ))}
              </div>
            )}
          </li>
        ))}
      </div>
      
    </main>
  );
}
