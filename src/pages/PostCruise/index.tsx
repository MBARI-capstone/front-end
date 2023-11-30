import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { GetServerSideProps } from 'next'
import Button from '../components/button'

interface PreExpedition {
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1.1/preExpedition/approved',
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

interface PreExpeditionsProps {
  expeditions: PreExpedition[]
}

const PostCruise: React.FC<PreExpeditionsProps> = ({ expeditions }) => {
  return (
    <div className="h-screen overflow-y-auto bg-custom-blue">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <div className="flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        {expeditions &&
          expeditions.map((expedition: PreExpedition) => (
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
              </div>
              <Button
                hrefLink={`/${expedition.expeditionId}`}
                buttonName="Add"
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default PostCruise
