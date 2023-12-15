import { SessionForm } from "@/components/forms/SessionForm";
import Header from "@/components/header/Header";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <main className="">
      <section>
        <Header />
        <SessionForm />
      </section>
    </main>
  );
};

export default Login;
