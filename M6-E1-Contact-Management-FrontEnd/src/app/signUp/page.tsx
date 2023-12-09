
import { SignupForm } from "@/components/forms/SignupForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignupForm />
        <ToastContainer />
      </section>
    </main>
  );
}
