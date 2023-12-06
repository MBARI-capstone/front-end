import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { GetServerSideProps } from 'next'
import Button from '../components/button'
import React, { useState } from 'react'

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

type TextDropdownProps = {
  title: string;
  text: string;
};

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
      
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 grid gap-10">
      <br/>
      <br/>
        <div className="grid gap-6 md:gap-8 ">
        {expeditions &&
          expeditions.map((expedition: PreExpedition) => (
            <div key={expedition.expeditionId} className="bg-white p-6 rounded-lg shadow-md mb-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            
              <h2 className="text-2xl font-bold tracking-tight col-span-full">
                Expedition ID: {expedition.expeditionId}
              </h2>
              <p className="text-gray-500 dark:text-black col-span-full ">Pre-Cruise Expedition</p>

              
              
              <span className="font-bold ">Purpose:</span>{' '}
              <TextDropdown title="Description" text={expedition.purpose} />

              <span className="font-bold"> Planned Track: </span>
              <TextDropdown title="Description" text={expedition.plannedTrackDescription}/>

              <span className="font-bold"> Region Description: </span>
              <TextDropdown title="Description" text={expedition.regionDescription}/>

              <span className="font-bold"> Equipment: </span>
              <TextDropdown title="Description" text={expedition.equipmentDescription}/>

              <span className="font-bold"> Participants: </span>
              <TextDropdown title="Description" text={expedition.participants}/>

              </div>
              </div>
              
              <div className="grid grid-cols-2 border border-gray-900 rounded px-4 mb-4">
                 <p>
                  <span className="font-bold">Start Date:</span>{' '}
                  {expedition.scheduledStartDate}
                </p>
                <p>
                  <span className="font-bold">End Date:</span>{' '}
                  {expedition.scheduledEndDate}
                </p>
                </div>
                
                <div className="grid grid-cols-3 border border-gray-900 rounded px-4 mb-4">
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
                </div>
               
                
               
                
                <div className="md:col-span-2 flex justify-end">
              <Button
                hrefLink={`/PostCruise/${expedition.expeditionId}`}
                buttonName="Add"
              />
              </div>
            </div>
          ))}
         
      </div>
      </section>
      
    </div>
  );
};

const TextDropdown: React.FC<TextDropdownProps> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to truncate the text
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="mb-4 border border-gray-900 rounded px-4">
    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <span className="font-medium text-sm text-gray-600">
        {isOpen ? `${title}:` : `${title}: ${text.substring(0, 50)}...`}
      </span>
        <svg className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} h-3 w-3 text-gray-600 ml-2`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <div className={`transition-height duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
        <p className="text-m text-black">{text}</p>
      </div>
    </div>
  );
};


export default PostCruise
