import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import BackButton from '../../components/BackButton'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const scientistsResponse = await fetch(
    'http://localhost:8080/api/v1.1/data/allUsers',
    {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        Cookie: context.req.headers.cookie || '',
      },
    }
  )

  const scientists = await scientistsResponse.json()

  return {
    props: {
      scientists,
    },
  }
}
interface Scientist {
  userId: number
  firstName: string
  lastName: string
}
interface ScientistProps {
  scientists: Scientist[]
}
const Dives: React.FC<ScientistProps> = ({ scientists }) => {
  const router = useRouter()
  const expeditionId = router.query.expeditionId
  const [rovName, setRovName] = useState('')
  const [diveNumber, setDiveNumber] = useState('')
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const rovDiveDto = {
      expeditionId: expeditionId,
      rovName: rovName,
      diveNumber: diveNumber,
      diveStartDatetime: event.target.diveTimeStart.value,
      diveEndDatetime: event.target.diveTimeEnd.value,
      diveChiefScientistId: parseInt(event.target.chiefScientist.value, 10),
      briefAccomplishments: event.target.acomplishments.value,
    }

    const response = await fetch('http://localhost:8080/api/v1.1/rovDive', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rovDiveDto),
    })

    if (!response.ok) {
      console.error('Failed to add dive')
    } else {
      console.log('Dive added successfully')
    }
  }

  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Dive Form
          </h1>

          <p className="mb-4 text-sm text-center italic">
            Please fill out all the information below in order to add a dive to
            this cruise.
          </p>
          <form method="post" onSubmit={handleSubmit}>
            <label
              htmlFor="rovName"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              ROV Name:
              <input
                type="text"
                id="rovName"
                value={rovName}
                onChange={(e: any) => setRovName(e.target.value)}
                className="border rounded-md ml-2 p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
            <label
              htmlFor="diveNumber"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Dive Number:
              <input
                type="text"
                id="diveNumber"
                value={diveNumber}
                onChange={(e: any) => setDiveNumber(e.target.value)}
                className="border rounded-md ml-2 p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
            <p className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2">
              Time of Dive:
            </p>
            <label
              htmlFor="diveTime"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Start
              <input
                type="datetime-local"
                id="diveTimeStart"
                name="diveTimeStart"
                className="ml-2 w-60 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                required
              ></input>
              <span className="ml-4">End</span>
              <input
                type="datetime-local"
                id="diveTimeEnd"
                className="ml-2 w-60 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                name="diveTimeEnd"
                required
              ></input>
            </label>
            ​
            <label
              htmlFor="chiefScientist"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Dive Chief Scientist:
              <select
                id="chiefScientist"
                className="border rounded-md ml-2"
                required
              >
                <option value="">(Select One)</option>
                {scientists &&
                  scientists.map((scientist) => (
                    <option key={scientist.userId} value={scientist.userId}>
                      {scientist.firstName} {scientist.lastName}
                    </option>
                  ))}
              </select>
            </label>
            ​
            <label
              htmlFor="acomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Dive Accomplishments:
              <textarea
                id="acomplishments"
                name="acomplishments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                cols={30}
                placeholder="A brief explination of what was accomplished on this dive."
              ></textarea>
            </label>
            {/* <!-- Save the user ID when they add a dive --> */}
            {/* <label htmlFor="diveNumber">ID of who added expedition to database:
          <input id="diveNumber" name="diveNumber" type="number"></input>
        </label> */}
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/SelectPostCruise" buttonName="Back" />
              <div className="flex-1"></div>{' '}
              <input
                type="submit"
                className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline mx-2"
                value="Add Dive"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dives
