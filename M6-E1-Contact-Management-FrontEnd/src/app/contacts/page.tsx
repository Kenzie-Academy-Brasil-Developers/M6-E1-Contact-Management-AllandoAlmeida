import Header from "@/components/header/Header";
import { FormContacts } from "../../components/forms/ContactsForm";

const Contacts = async () => {


 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header />
      <section>
        <FormContacts/>
      </section>
    </main>
  )
}

export default Contacts;