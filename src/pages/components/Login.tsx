import Link from 'next/link'
import { useState, FormEvent } from 'react'
import SignInbutton from './SignInbutton'
import { useRouter } from 'next/router'
import { useSetAtom } from 'jotai'
import { userRoleAtom } from './store'



interface ErrorResponse {
  error: string
}

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter() // Using Next.js router for redirection
  const setUserRole = useSetAtom(userRoleAtom)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8080/api/v1.1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include',
        }
      )

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json()
        throw new Error(errorData.error || 'Login failed')
      }

      const data = await response.json()

      console.log('Login successful', data)
      setUserRole(data.userRole)

      router.push('PageSelect')
    } catch (error) {
      console.error('Login error:', error)
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    }
  }

  return (
    <>
      <div className="flex min-h-md flex-1 flex-col justify-center px-6 py-1 lg:px-8 ">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-cyan-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-center h-full  ">
              {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                onClick={handleLogin}
                className="flex items-center justify-center h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login