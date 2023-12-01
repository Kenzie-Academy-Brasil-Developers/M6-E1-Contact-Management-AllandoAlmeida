import { ContactForm } from "@/app/contacts/formContacts/FormContacts";

export default function Contacts() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <ContactForm/>
      </section>
    </main>
  )
}
