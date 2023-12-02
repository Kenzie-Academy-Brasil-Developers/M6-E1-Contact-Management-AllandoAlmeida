// Considere ajustar os tipos conforme a estrutura real dos seus dados.
interface CustomerType {
  id: string;
  username: string;
  name: string;
  phones: { id: string; telephone: string }[];
  emails: { id: string; email: string }[];
  isActive: string;
}

interface IFormSignUp {
  customer: CustomerType;
}

export const CardProfile: React.FC<IFormSignUp> = ({ customer }) => {
  return (
    <ul className="flex flex-row justify-around items-center mt-1 h-[3rem] gap-2 border-b-2  border-white-700">
      <li>Nome do Cliente: {customer.name}</li>
      <li>Username: {customer.username}</li>
      <li>Ativo: {customer.isActive ? "Sim" : "Não"}</li>

      {/* Telefones do Cliente */}
      <li>Telefones do Cliente:</li>
      <ul>
        {customer.phones.map((phone) => (
          <li key={phone.id}>{phone.telephone}</li>
        ))}
      </ul>

      {/* Emails do Cliente */}
      <li>Emails do Cliente:</li>
      <ul>
        {customer.emails.map((email) => (
          <li key={email.id}>{email.email}</li>
        ))}
      </ul>
    </ul>
  );
};

{
  /*  <div key={profileData.id}>
      <h1>Bem-vindo ao seu perfil, {profileData.name}!</h1>
<span className="rounded-full bg-emerald-500 w-7 h-7">{customers.username}</span>
<span className="text-[0.75rem]  text-white font-roboto">
  {customers.name}
</span> */
}
