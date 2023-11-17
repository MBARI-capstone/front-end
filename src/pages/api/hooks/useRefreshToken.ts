import { useRouter } from 'next/router'

const useRefreshToken = () => {
  const router = useRouter()

  const refreshAccessToken = async () => {
    try {
      const refreshResponse = await fetch(
        'http://localhost:8080/api/v1.1/auth/refresh',
        {
          method: 'POST',
          credentials: 'include',
        }
      )

      if (refreshResponse.status === 403) {
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error)
    }
  }

  return refreshAccessToken
}

export default useRefreshToken
