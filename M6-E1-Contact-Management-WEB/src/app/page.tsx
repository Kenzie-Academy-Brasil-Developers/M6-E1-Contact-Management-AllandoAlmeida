'use client'
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { CustomToastContainer } from "../components/CustomToastContainer/CustomToastContainer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
      <CustomToastContainer />
    </main>
  );
}
