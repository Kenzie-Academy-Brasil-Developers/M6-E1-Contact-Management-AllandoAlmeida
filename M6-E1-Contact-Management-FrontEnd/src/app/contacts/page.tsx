import { FormContacts } from "../../components/forms/ContactsForm";


export default function Contacts() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mt-[5rem]">
        <FormContacts/>
      </section>
    </main>
  )
}
