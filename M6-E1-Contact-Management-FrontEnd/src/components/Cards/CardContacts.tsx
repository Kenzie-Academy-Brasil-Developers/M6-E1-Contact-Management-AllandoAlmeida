export interface ContactType {
  contact: any;
  id: string;
  name: string;
  zipCode: string;
  street: string;
  complement: string;
  district: string;
  locality: string;
  state: string;
  phones: { id: string; telephone: string }[];
  emails: { id: string; email: string }[];
}

export interface ICardContact {
  contact: ContactType;
}

export const CardContact: React.FC<ICardContact> = ({ contact }) => {
  if (!contact || !contact.contact) {
    return <div>Dados de contato indisponíveis</div>;
  }

  return (
    <>
      <ul className="grid grid-cols-3 justify-around items-center mt-1 h-[5rem] gap-2 border-b-[0.02rem]  border-gray-700 text-[2rem] hover:border-b-[0.05rem] ">
        <li>{contact.contact.name || "Nome não disponível"}</li>

        <ul>
          {contact.contact.phones?.map((phone) => (
            <li key={phone.id}>
              {phone.telephone || "Telefone não disponível"}
            </li>
          ))}
        </ul>
        <ul>
          {contact.contact.emails?.map((email) => (
            <li key={email.id}>{email.email || "Email não disponível"}</li>
          ))}
        </ul>
      </ul>
    </>
  );
};

{
  /* <ul className="flex flex-row justify-around items-center mt-1 h-[3rem] gap-2 border-b-2  border-white-700 text-[2rem] ">
      <li>Contato: {contact.contact.name || "Nome não disponível"}</li>
      <li>Nome do Contato: {contact.contact.name || "Nome não disponível"}</li>

      <li>Telefones do Contato:</li>

      {contact.contact.phones?.map((phone) => (
        <li key={phone.id}>{phone.telephone || "Telefone não disponível"}</li>
      ))}

      <li>Emails do Contato:</li>

      {contact.contact.emails?.map((email) => (
        <li key={email.id}>{email.email || "Email não disponível"}</li>
      ))}
    </ul> */
}
