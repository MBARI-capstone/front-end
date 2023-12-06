import React from 'react'

import { useRouter } from 'next/router'
import { useSetAtom } from 'jotai'
import { userRoleAtom } from './store'

const LogOutButton = () => {
  const router = useRouter()
  const setRole = useSetAtom(userRoleAtom)
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/v1.1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setRole(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
  <div className= "group inline-block ">
    <button
      type="submit"
      onClick={handleLogout}
      className=" h-12 px-6 border-2 border-gray-300 rounded-full w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
    >
      Logout
    </button>
    </div>
  )
}

export default LogOutButton
