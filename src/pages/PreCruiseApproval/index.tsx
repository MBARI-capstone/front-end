import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/ButtonApprove'
import Modal from '../components/Modal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface UnApprovedPreExpedition {
  expeditionId: number
  shipId: number
  chiefScientistId: number
  principalInvestigatorId: number
  purpose: string
  scheduledStartDate: string
  scheduledEndDate: string
  equipmentDescription: string
  participants: string
  regionDescription: string
  plannedTrackDescription: string
}

const PreCruiseApproval = () => {
  const [submissionStatus, setSubmissionStatus] = useState({
    status: '',
    message: '',
  })
  const [expeditions, setExpeditions] = useState<UnApprovedPreExpedition[]>([])
  const [selectedExpedition, setSelectedExpedition] =
    useState<UnApprovedPreExpedition | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const formatBoolean = (value: any) => (value ? 'Yes' : 'No')

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const confirmDeny = () => {
    // Handle the deny action
    console.log('Pre-cruise denied')
    // Close the modal after confirming
    closeModal()
  }

  const handleDeny = () => {
    console.log('Expedition Denied:', selectedExpedition?.expeditionId)
    // Add logic to handle denial
  }

  const handleApprove = async () => {
    if (selectedExpedition && selectedExpedition.expeditionId) {
      console.log(selectedExpedition)
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1.1/preExpedition/approve',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedExpedition.expeditionId),
            credentials: 'include',
          }
        )
        if (response.ok) {
          setSubmissionStatus({
            status: 'success',
            message: 'Approved successfully.',
          })
          toast.success('Approved successfully.')
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      } catch (error: any) {
        console.error('Error posting data:', error)
        setSubmissionStatus({
          status: 'error',
          message: error.message || 'Failed to Approve.',
        })
        toast.error('Failed to Approve.')
      }
    }
  }

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1.1/preExpedition/unapproved',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        ) // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setExpeditions(data)
      } catch (error) {
        console.error('Fetching expeditions failed', error)
      }
    }

    fetchExpeditions()
  }, [])

  return (
    <div className="h-screen overflow-y-auto">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <ToastContainer position="top-center" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Pre-Cruise Approval
          </h1>
          {/* Dropdown for selecting an expedition */}
          <div className="mb-4">
            <select
              onChange={(e) => {
                const expeditionId = Number(e.target.value)
                const expedition = expeditions.find(
                  (exp) => exp.expeditionId === expeditionId
                )
                setSelectedExpedition(expedition ?? null) // Set to null if not found
              }}
              className="form-select block w-full"
            >
              <option value="">Select an Expedition</option>
              {expeditions.map((exp) => (
                <option key={exp.expeditionId} value={exp.expeditionId}>
                  {exp.purpose} ({exp.scheduledStartDate} to{' '}
                  {exp.scheduledEndDate})
                </option>
              ))}
            </select>
          </div>
          {/* Display selected expedition details */}
          {selectedExpedition && (
            <div className="my-4 p-4 border rounded">
              <h3 className="text-lg font-bold">Expedition Details</h3>
              <p>
                <strong>ID:</strong> {selectedExpedition.expeditionId}
              </p>
              <p>
                <strong>Ship ID:</strong> {selectedExpedition.shipId}
              </p>
              <p>
                <strong>Purpose:</strong> {selectedExpedition.purpose}
              </p>
              <p>
                <strong>Chief Scientist ID:</strong>{' '}
                {selectedExpedition.chiefScientistId}
              </p>
              <p>
                <strong>Principal Investigator ID:</strong>{' '}
                {selectedExpedition.principalInvestigatorId}
              </p>
              <p>
                <strong>Scheduled Start Date:</strong>{' '}
                {selectedExpedition.scheduledStartDate}
              </p>
              <p>
                <strong>Scheduled End Date:</strong>{' '}
                {selectedExpedition.scheduledEndDate}
              </p>
              <p>
                <strong>Equipment Description:</strong>{' '}
                {selectedExpedition.equipmentDescription}
              </p>
              <p>
                <strong>Participants:</strong> {selectedExpedition.participants}
              </p>
              <p>
                <strong>Region Description:</strong>{' '}
                {selectedExpedition.regionDescription}
              </p>
              <p>
                <strong>Planned Track Description:</strong>{' '}
                {selectedExpedition.plannedTrackDescription}
              </p>
              {/* <p>
                <strong>Actual Start Date:</strong>{' '}
                {selectedExpedition.actualStartDate}
              </p>
              <p>
                <strong>Actual End Date:</strong>{' '}
                {selectedExpedition.actualEndDate}
              </p>
              <p>
                <strong>Accomplishments:</strong>{' '}
                {selectedExpedition.accomplishments}
              </p>
              <p>
                <strong>Scientist Comments:</strong>{' '}
                {selectedExpedition.scientistComments}
              </p>
              <p>
                <strong>Scientific Objectives Met:</strong>{' '}
                {formatBoolean(selectedExpedition.sciObjectivesMet)}
              </p>
              <p>
                <strong>Operator Comments:</strong>{' '}
                {selectedExpedition.operatorComments}
              </p>
              <p>
                <strong>All Equipment Functioned:</strong>{' '}
                {formatBoolean(selectedExpedition.allEquipmentFunctioned)}
              </p>
              <p>
                <strong>Other Comments:</strong>{' '}
                {selectedExpedition.otherComments}
              </p>
              Approve and Deny buttons */}
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            confirmAction={confirmDeny}
          >
            Confirm Denial
          </Modal>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={openModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Deny
            </Button>
            <Button
              onClick={() => handleApprove()}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreCruiseApproval
