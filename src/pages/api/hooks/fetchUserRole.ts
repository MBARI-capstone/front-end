import { UserRoleType } from '../../components/store'

const API_URL = 'http://localhost:8080/api/v1.1/auth/userRole'

export async function fetchUserRole(context: any): Promise<any> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: context.req.headers.cookie || '',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.role as UserRoleType
  } catch (error) {
    console.error('Error fetching user role:', error)
    throw error
  }
}
