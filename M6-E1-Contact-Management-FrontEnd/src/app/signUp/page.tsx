"use client";
import { SignupForm } from "@/components/forms/SignupForm";
import Header from "@/components/header/Header";

export default function SignUp() {
  return (
    <main>
      <Header/>
      <section>
        <SignupForm />
      </section>
    </main>
  );
}
