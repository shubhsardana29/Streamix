import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BackgroundBeams } from "../components/ui/background-beams"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Streamix - Anonymous Video Hosting',
  description: 'Upload and share videos anonymously with temporary or permanent links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-600 min-h-screen text-white`}>
        <BackgroundBeams />
        <div className="relative z-10">
          <header className="p-4 bg-black bg-opacity-50">
            <h1 className="text-3xl font-bold text-center">Streamix</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}