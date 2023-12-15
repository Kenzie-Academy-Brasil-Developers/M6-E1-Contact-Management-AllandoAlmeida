
import { SessionForm } from "@/components/forms/SessionForm";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <main className="">
      <section>
        <Header/>
        <SessionForm />
      </section>
    </main>
  );
}
