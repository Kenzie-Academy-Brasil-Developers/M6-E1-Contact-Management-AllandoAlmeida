import { FormSession } from '@/components/forms/formSession/FormSession'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <FormSession/>
      </section>
    </main>
  )
}
