"use client";
import { Footer } from "@/components/footer/Footer";
import { RegisterForm } from "@/components/forms/RegisterForm";
import Header from "@/components/header/Header";
import { CreateItemsIcon } from "@/components/icons/CreateItemsIcon";
import { NextPage } from "next";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <main className="flex items-center justify-center">
      <Header />
      <section className="container profile-Container w-[95vw] m-auto md:w-[60vw] h-[80vh] md:gap-x-10 flex-wrap md:mt-0">
      
        <div className="flex gap-5 items-center backdrop-filter backdrop-blur-lg bg-opacity-50 bg-transparent  w-[95%] md:w-[95%] px-5 flex-wrap border-2">
         
          <div className="container profile-Container w-[10vw] m-auto md:w-[10vw] h-[10vh] md:gap-x-10 flex-wrap md:mt-0">
           <p className="text-[2rem]">Contato</p>
          </div>
          <div className="container profile-Container w-[10vw] m-auto md:w-[10vw] h-[10vh] md:gap-x-10 flex-wrap md:mt-0">
           <p className="text-[2rem]">Tarefa</p>
          </div>
          <div className="container profile-Container w-[10vw] m-auto md:w-[10vw] h-[10vh] md:gap-x-10 flex-wrap md:mt-0">
           <p className="text-[2rem]">Lembrete</p>
           <p className="text-[2rem]">Calendário</p>
          </div>
          <div className="container profile-Container w-[10vw] m-auto md:w-[10vw] h-[10vh] md:gap-x-10 flex-wrap md:mt-0">
           <p className="text-[2rem]">Metas</p>
          </div>
          <div className="container profile-Container w-[10vw] m-auto md:w-[10vw] h-[10vh] md:gap-x-10 flex-wrap md:mt-0">
           <p className="text-[2rem]">Notas</p>
          </div>
        </div>
        
      </section>
      <Footer />
    </main>
  );
  }
  
export default Register;