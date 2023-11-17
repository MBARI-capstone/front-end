import React from 'react'
import { GetServerSideProps } from 'next'
import { Ship } from '../components/store'

interface TestProps {
  ships: Ship[]
}

const Test = ({ ships }: TestProps) => {
  if (!ships) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {ships.map((ship: Ship) => (
        <div key={ship.shipId}>{ship.shipName}</div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1.1/data/allShips',
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: context.req.headers.cookie || '',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const ships: Ship[] = await response.json()
    return { props: { ships } }
  } catch (error) {
    console.error('Failed to fetch ships:', error)
    return { props: { ships: [] } }
  }
}

export default Test
