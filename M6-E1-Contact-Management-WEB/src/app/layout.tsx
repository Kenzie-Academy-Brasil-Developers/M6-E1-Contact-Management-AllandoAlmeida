import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contact-Management',
  description: 'Sistema de Gestão de Clientes e Contatos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      
      <Header />
      <body className={inter.className}>{children}</body>
      
    </html>
  )
}
