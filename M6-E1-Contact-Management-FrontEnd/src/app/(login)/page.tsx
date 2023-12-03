
"use client";
import { FormSession } from "@/app/(login)/components/FormSession";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Session } from "./service/session.service";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../profile/service/profile.service";
import { Header } from "@/components/header/Header";

export default function Home() {
  const router = useRouter();

  const handleLogin = async (credentials: any) => {
    console.log("entrou");

    try {
      const responseData = await Session(credentials);
      console.log("responseData", responseData);

      if (responseData) {
        router.push("/profile");
        fetchProfile();
      } else {
        toast.error("Falha no login!", {
          transition: Slide,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <section>
        <div className="mt-12">
          <FormSession onLogin={handleLogin} />
        </div>
        <ToastContainer />
      </section>
    </main>
  );
}
