'use client'
import { FormSession } from '@/app/(login)/components/FormSession'
import { FormSignUp } from '@/app/signup/components/FormSignUp';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <FormSignUp/>
        <ToastContainer/>
      </section>
    </main>
  )
}
