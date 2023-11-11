import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Ship, userRoleAtom } from '../components/store'

const Test = () => {
  const userRole = useAtomValue(userRoleAtom)
  const [ships, setShips] = useState<Ship[]>()
  console.log('userrole', userRole)
  useEffect(() => {
    async function fetchShips() {
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1.1/data/allShips',
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const data: Ship[] = await response.json()
        console.log(data)
        setShips(data)
      } catch (error) {
        console.error('Failed to fetch ships:', error)
      }
    }

    fetchShips()
  }, [])

  if (!ships) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {ships &&
        ships.map((ship: Ship) => <div key={ship.shipId}>{ship.shipName}</div>)}
    </div>
  )
}

export default Test
