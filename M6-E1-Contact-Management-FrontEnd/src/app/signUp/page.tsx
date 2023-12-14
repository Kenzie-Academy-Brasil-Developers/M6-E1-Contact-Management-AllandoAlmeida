"use client";
import { SignupForm } from "@/components/forms/SignupForm";
import Header from "@/components/header/Header";

export default function SignUp() {
  return (
    <main>
      <Header customer={undefined} />
      <section>
        <SignupForm />
      </section>
    </main>
  );
}
