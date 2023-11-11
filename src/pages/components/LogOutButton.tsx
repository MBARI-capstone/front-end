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
    <button
      type="submit"
      onClick={handleLogout}
      className="flex items-center justify-center h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
    >
      Logout
    </button>
  )
}

export default LogOutButton
