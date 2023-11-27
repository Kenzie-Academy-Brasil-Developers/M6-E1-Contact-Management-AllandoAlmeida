import { ToastContainer } from "react-toastify";
import { LoginForm } from "./components/Form/LoginForm";
import { ContactForm } from "./components/Form/ContactForm";
import AddressForm from "./components/Form/AddressForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <ContactForm/>
      <AddressForm/>
    </main>
  );
}