import { ContactForm } from "../components/Form/ContactForm";

export default async function contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ContactForm />
    </main>
  );
}
