import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { GetServerSideProps } from 'next'
import Button from '../components/button'

interface PostExpedition {
  expeditionId: number
  shipName: string
  chiefScientistName: string
  principalInvestigatorName: string
  purpose: string
  scheduledStartDate: string
  scheduledEndDate: string
  equipmentDescription: string
  participants: string
  regionDescription: string
  plannedTrackDescription: string
  actualStartDate: string
  actualEndDate: string
  accomplishments: string
  scientistComments: string
  sciObjectivesMet: string
  operatorComments: string
  allEquipmentFunctioned: string
  otherComments: string
  updatedBy: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1.1/postExpedition',
      {
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Cookie: context.req.headers.cookie || '',
        },
      }
    )
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const expeditions = await response.json()
    console.log(expeditions)
    return {
      props: {
        expeditions,
      },
    }
  } catch (error: any) {
    // In case of an error, you can return an error prop, or you can choose to handle it differently
    return { props: { error: error.message } }
  }
}

interface PostExpeditionsProps {
  expeditions: PostExpedition[]
}

const SelectPostCruise: React.FC<PostExpeditionsProps> = ({ expeditions }) => {
  return (
    <div className="h-screen overflow-y-auto bg-custom-blue">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <div className="flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <h1 className="text-white font-bold">Post Cruises</h1>
        {expeditions &&
          expeditions.map((expedition: PostExpedition) => (
            <div
              key={expedition.expeditionId}
              className="bg-white p-6 rounded-lg shadow-md mb-4 w-full max-w-md mx-auto"
            >
              <h2 className="text-xl font-bold mb-4">
                Expedition ID: {expedition.expeditionId}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <span className="font-bold">Ship:</span> {expedition.shipName}
                </p>
                <p>
                  <span className="font-bold">Chief Scientist:</span>{' '}
                  {expedition.chiefScientistName}
                </p>
                <p>
                  <span className="font-bold">Principal Investigator:</span>{' '}
                  {expedition.principalInvestigatorName}
                </p>
                <p>
                  <span className="font-bold">Purpose:</span>{' '}
                  {expedition.purpose}
                </p>
                <p>
                  <span className="font-bold">Start Date:</span>{' '}
                  {expedition.scheduledStartDate}
                </p>
                <p>
                  <span className="font-bold">End Date:</span>{' '}
                  {expedition.scheduledEndDate}
                </p>
                <p>
                  <span className="font-bold">Equipment:</span>{' '}
                  {expedition.equipmentDescription}
                </p>
                <p>
                  <span className="font-bold">Participants:</span>{' '}
                  {expedition.participants}
                </p>
                <p>
                  <span className="font-bold">Region:</span>{' '}
                  {expedition.regionDescription}
                </p>
                <p>
                  <span className="font-bold">Track:</span>{' '}
                  {expedition.plannedTrackDescription}
                </p>
                <p>
                  <span className="font-bold">Actual Start Date:</span>{' '}
                  {expedition.actualStartDate}
                </p>
                <p>
                  <span className="font-bold">Actual End Date:</span>{' '}
                  {expedition.actualEndDate}
                </p>
                <p>
                  <span className="font-bold">Accomplishments:</span>{' '}
                  {expedition.accomplishments}
                </p>
                <p>
                  <span className="font-bold">Scientist Comments:</span>{' '}
                  {expedition.scientistComments}
                </p>
                <p>
                  <span className="font-bold">Scientific Objectives Met:</span>{' '}
                  {expedition.sciObjectivesMet}
                </p>
                <p>
                  <span className="font-bold">Operator Comments:</span>{' '}
                  {expedition.operatorComments}
                </p>
                <p>
                  <span className="font-bold">All Equipment Functioned:</span>{' '}
                  {expedition.allEquipmentFunctioned}
                </p>
                <p>
                  <span className="font-bold">Other Comments:</span>{' '}
                  {expedition.otherComments}
                </p>
                <p>
                  <span className="font-bold">Updated By:</span>{' '}
                  {expedition.updatedBy}
                </p>
              </div>
              <Button
                hrefLink={`/SelectPostCruise/Dives/${expedition.expeditionId}`}
                buttonName="Add Dives"
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default SelectPostCruise
