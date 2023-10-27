import Image from 'next/image'
import { Login } from './components'

export default function Home() {
  return (
    <main className="overflow-hidden min-h-screen  bg-custom-blue flex flex-col  items-start sm:py-10">
      <div className="h-max mx-auto flex flex-col items-center">
        <Image
          className="mx-auto drop-shadow-2xl "
          src="/MBARI-Logo.png"
          alt="MBARI logo"
          width={350}
          height={350}
        />
      </div>
      <div className="bg-white shadow max-w-sm w-full rounded-sm divide-y divide-gray-200 border border-blue-300 mx-auto drop-shadow-xl">
        <div className="px-5 py-6">
          <Login href="/PageSelect" />
        </div>
      </div>
    </main>
  )
}
