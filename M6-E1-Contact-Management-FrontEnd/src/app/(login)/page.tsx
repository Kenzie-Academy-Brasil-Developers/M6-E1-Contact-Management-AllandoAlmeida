'use client'
import { SessionForm } from "@/components/forms/SessionForm";
import Header from "@/components/header/Header";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Header customer={null}/>
      <section>
        <div className="mt-12">
          <SessionForm/>
        </div>
        
      </section>
    </main>
  );
}
