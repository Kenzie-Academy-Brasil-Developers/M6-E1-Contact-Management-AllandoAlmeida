/* "use client";
import { FormSession } from "@/app/(login)/components/FormSession";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Session, fetchProfile } from "./service/session.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleLogin = async (credentials: any) => {
    console.log("entrou");

    try {
      const responseData = await Session(credentials);
      console.log("responseData", responseData);

      if (responseData) {
       router.push('/profile')
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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();

        if (!profileData) {
          localStorage.clear();
          router.push ("/");
        } else {
          console.log("Dados do perfil:", profileData);
        }
      } catch (error) {
        console.error("Erro durante o carregamento do perfil:", error);

        localStorage.clear();
        router.push ("/");
      }
    };

    loadProfile();
  }, [router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <FormSession onLogin={handleLogin} />
        <ToastContainer />
      </section>
    </main>
  );
}
 */

// page.tsx

"use client";
import { FormSession } from "@/app/(login)/components/FormSession";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Session } from "./service/session.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../profile/service/profile.service";

export default function Home() {
  const router = useRouter();

  const handleLogin = async (credentials: any) => {
    console.log("entrou");

    try {
      const responseData = await Session(credentials);
      console.log("responseData", responseData);

      if (responseData) {
        router.push('/profile');
        fetchProfile(responseData.id)
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
      <section>
        <FormSession onLogin={handleLogin} />
        <ToastContainer />
      </section>
    </main>
  );
}
