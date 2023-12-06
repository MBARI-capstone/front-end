import { useState, useEffect, SetStateAction } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/button'
import BackButton from '../components/BackButton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface User {
  userId: number
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const response = await fetch(
//       'http://localhost:8080/api/v1.1/auth/myUserId',
//       {
//         credentials: 'include',
//         headers: {
//           'Content-type': 'application/json',
//           Cookie: context.req.headers.cookie || '',
//         },
//       }
//     )
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`)
//     }
//     const userId = await response.json()
//     console.log('userid: ', userId)
//     return {
//       props: {
//         userId,
//       },
//     }
//   } catch (error: any) {
//     // In case of an error, you can return an error prop, or you can choose to handle it differently
//     return { props: { error: error.message } }
//   }
// }

interface Props {
  id: number
  // userId: number
}

const PostCruiseForm: React.FC = () => {
  const router = useRouter()
  const id = router.query.id
  console.log('id from page', id)
  const [submissionStatus, setSubmissionStatus] = useState({
    status: '',
    message: '',
  })
  const [actualStartDate, setactualStartDate] = useState('')
  const [actualEndDate, setactualEndDate] = useState('')
  const [accomplishments, setAccomplishments] = useState('')
  const [scientistComments, setScientistComments] = useState('')
  const [sciObjectivesMet, setsciObjectivesMet] = useState<boolean>(false)
  const [operatorComments, setoperatorComments] = useState('')
  const [allEquipmentFunctioned, setallEquipmentFunctioned] =
    useState<boolean>(false)
  const [otherComments, setotherComments] = useState('')

  const handleActualStartDate = (e: {
    target: { value: SetStateAction<string> }
  }) => setactualStartDate(e.target.value)
  const handleActualEndDate = (e: {
    target: { value: SetStateAction<string> }
  }) => setactualEndDate(e.target.value)
  const handleAccomplishments = (e: {
    target: { value: SetStateAction<string> }
  }) => setAccomplishments(e.target.value)
  const handleScienceComments = (e: {
    target: { value: SetStateAction<string> }
  }) => setScientistComments(e.target.value)
  const handleSciObjectives = (e: { target: { checked: boolean } }) =>
    setsciObjectivesMet(e.target.checked)
  const handleOperatorComments = (e: {
    target: { value: SetStateAction<string> }
  }) => setoperatorComments(e.target.value)
  const handleAllEquipmentFunctioned = (e: { target: { checked: boolean } }) =>
    setallEquipmentFunctioned(e.target.checked)
  const handleOtherComments = (e: {
    target: { value: SetStateAction<string> }
  }) => setotherComments(e.target.value)

  const resetForm = () => {
    setactualStartDate('')
    setactualEndDate('')
    setAccomplishments('')
    setScientistComments('')
    setsciObjectivesMet(false)
    setoperatorComments('')
    setallEquipmentFunctioned(false)
    setotherComments('')
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const postExpeditionData = {
      expeditionId: id,
      actualStartDate: actualStartDate,
      actualEndDate: actualEndDate,
      accomplishments: accomplishments,
      scientistComments: scientistComments,
      sciObjectivesMet: sciObjectivesMet,
      operatorComments: operatorComments,
      allEquipmentFunctioned: allEquipmentFunctioned,
      otherComments: otherComments,
      updatedBy: 1,
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/v1.1/postExpedition',
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postExpeditionData),
        }
      )
      if (response.ok) {
        // Call the reset function here upon successful submission
        resetForm()
        setSubmissionStatus({
          status: 'success',
          message: 'Form submitted successfully.',
        })
        toast.success('Form submitted successfully.')
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error: unknown) {
      let errorMesage = 'Failed to submit form.'
      if (error instanceof Error) {
        errorMesage = error.message
      }
      console.error('Error posting data:', error)
      setSubmissionStatus({ status: 'error', message: errorMesage })
      toast.error('Failed to submit the form.')
    }
  }

  return (
    <div className="h-screen overflow-y-auto">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <ToastContainer position="top-center" />
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Post-Cruise Form
          </h1>

          <form onSubmit={handleSubmit}>
            <p className="mb-4 text-sm text-center italic">
              Please fill out all the information below in order to submit a
              request for a post cruise approval.
            </p>
            <label
              htmlFor="scheduledStartDatetime"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Actual Start Date time:
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <input
                  type="date"
                  id="actualStartDate"
                  name="actualStartDate"
                  onChange={handleActualStartDate}
                  value={actualStartDate || ''}
                  className=" shadow leading-tight focus:outline-none focus:shadow-outline border border-gray-300  text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  required
                ></input>
              </div>
            </label>
            <label
              htmlFor="scheduledEndDatetime"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Scheduled End Date time:
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <input
                  type="date"
                  id="actualEndDatetime"
                  name="actualEndDatetime"
                  onChange={handleActualEndDate}
                  value={actualEndDate || ''}
                  className=" shadow leading-tight focus:outline-none focus:shadow-outline border border-gray-300  text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Acomplishments:{' '}
              <textarea
                id="acomplishments"
                name="acomplishments"
                onChange={handleAccomplishments}
                value={accomplishments || ''}
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="acomplishments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Scientist Comments:{' '}
              <textarea
                id="scientistComments"
                name="scientistComments"
                onChange={handleScienceComments}
                value={scientistComments || ''}
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="scientistComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Scientist Objectives Met?:{' '}
              <input
                type="checkbox"
                id="sciObjectivesMet"
                onChange={handleSciObjectives}
                checked={sciObjectivesMet}
                name="sciObjectivesMet"
              ></input>
            </label>
            <label
              htmlFor="equipmentFunctioned"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              All Equipment Functioned?:{' '}
              <input
                type="checkbox"
                id="allEquipmentFunctioned"
                onChange={handleAllEquipmentFunctioned}
                checked={allEquipmentFunctioned}
                name="allEquipmentFunctioned"
              ></input>
            </label>
            <label
              htmlFor="operatorComments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Operator Comments:{' '}
              <textarea
                id="operatorComments"
                name="operatorComments"
                onChange={handleOperatorComments}
                value={operatorComments || ''}
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="operatorComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>

            <label
              htmlFor="otherComments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Other Comments:{' '}
              <textarea
                id="otherComments"
                name="otherComments"
                onChange={handleOtherComments}
                value={otherComments || ''}
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="otherComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            {/* <!-- Need to also submit the ID of the user who submitted the form, will be recorded on database, but not listed on form. Can be retrieved from database based on who is logged in --> */}
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{' '}
              <input
                type="submit"
                className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline mx-2"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostCruiseForm
