"use client";
import { AuthProvider } from "@/contexts/authContext";
import { ContactProvider } from "@/contexts/contactContext";
import { CustomerProvider } from "@/contexts/customerContext";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
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
      <AuthProvider>
        <ContactProvider>
          <CustomerProvider>{children}</CustomerProvider>
        </ContactProvider>
      </AuthProvider>
    </>
  );
};
