import { api } from "../services/api";

export interface ICustomers {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isActive: Boolean;
  phones: IPhone[];
  emails: IEmail[];
  contacts: IContact[];
}

export interface IPhone {
  id: string;
  telephone: string;
  
}

export interface IEmail {
  id: string;
  email: string;
}

export interface IContact {
  id: string;
  name: string;
  createdAt: string; 
  updatedAt?: string;
  isActive: boolean;
}

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
      {/* <FormLogin /> */}
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
