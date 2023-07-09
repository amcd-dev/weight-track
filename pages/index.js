import Image from 'next/image'

import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const { user, error, isLoading } = useUser();
    console.log('>>> Logging user obj: ', user)

  return (
      <div className="container mx-auto sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                  {!user ? <Link href='/api/auth/login'>Sign In</Link> : <Link href='/api/auth/logout'>Sign Out</Link>}
                  <button
                      type="button"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                      Button
                  </button>
                  <Link href='/dashboard/'>Dashboard</Link>
                  {user ? <p>{user.sub}</p> : <p></p>}
              </div>
          </div>
      </div>
  )
}
