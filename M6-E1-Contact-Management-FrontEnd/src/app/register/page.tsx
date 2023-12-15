"use client";
import { RegisterForm } from "@/components/forms/RegisterForm";
import Header from "@/components/header/Header";
import { NextPage } from "next";

const Register: NextPage = () => {
    return (
      <main className="">
          <Header/>
        <section>
          <RegisterForm />
        </section>
      </main>
    );
  }
  
export default Register;