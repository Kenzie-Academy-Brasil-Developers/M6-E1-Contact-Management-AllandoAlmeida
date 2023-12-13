import Header from "@/components/header/Header";
import { FormContacts } from "../../components/forms/ContactsForm";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";
import { fetchCustomer } from "@/contexts/customerContext";


const Contacts = async () => {
  await verifyAccessToken()

  const customer = await fetchCustomer();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header customer={customer}/>
      <section className="mt-[5rem]">
        <FormContacts/>
      </section>
    </main>
  )
}

export default Contacts;