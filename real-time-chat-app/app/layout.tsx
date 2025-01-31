import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Modern Chat App",
  description: "A sleek and simple modern chat website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <nav className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">Chat App</h1>
            </div>
            <ul className="space-y-2 p-4">
              <li>
                <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/private" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                  Private Messages
                </Link>
              </li>
              <li>
                <Link href="/group" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                  Group Messages
                </Link>
              </li>
              <li>
                <Link href="/public" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                  Public Messages
                </Link>
              </li>
            </ul>
          </nav>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}

