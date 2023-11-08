import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Button from "../components/ButtonApprove"
import Modal from "../components/Modal"

//DUMMY PAGE
const PreCruiseApproval = () => {

    const handleDeny = () => {
        console.log('Expedition Denied:', selectedExpedition.expeditionId);
        // Add logic to handle denial
      };
    
      const handleApprove = () => {
        console.log('Expedition Approved:', selectedExpedition.expeditionId);
        // Add logic to handle approval
      };
    
  // Dummy data for expeditions
  const dummyExpeditions = [
    {
      expeditionId: 0  
    },
    {
      expeditionId: 1,
      shipId: 1,
      purpose: 'Deep sea exploration',
      chiefScientistId: 2,
      principalInvestigatorId: 1,
      scheduledStartDate: '2023-11-01',
      scheduledEndDate: '2023-11-15',
      equipmentDescription: 'ROV, Sonar, Deep-sea camera',
      participants: 'John Doe, Jane Smith, Richard Roe',
      regionDescription: 'Pacific Ocean, near Mariana Trench',
      plannedTrackDescription: 'Starting from point A, moving towards point B, then deep diving at point C',
      // ... other properties
    },
    {
        expeditionId: 2,
        shipId: 2,
        purpose: 'Marine biology research',
        chiefScientistId: 3,
        principalInvestigatorId: 2,
        scheduledStartDate: '2023-12-01',
        scheduledEndDate: '2023-12-15',
        equipmentDescription: 'Submersibles, Diving equipment, Sampling tools',
        participants: 'Alice Brown, Bob Jones',
        regionDescription: 'Atlantic Ocean, near the Bermuda Triangle',
        plannedTrackDescription: 'Surveying coral reefs and collecting samples',
        // ... other properties
      },
    // ... more expeditions
  ];

  const [selectedExpedition, setSelectedExpedition] = useState(dummyExpeditions[0]);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }
  
  const closeModal = () => {
    setModalOpen(false);
  }

  const confirmDeny = () => {
    // Handle the deny action
    console.log('Pre-cruise denied');
    // Close the modal after confirming
    closeModal();
  };

  const handleSelectChange = (e) => {
    const expeditionId = e.target.value;
    const expedition = dummyExpeditions.find(exp => exp.expeditionId.toString() === expeditionId);
    setSelectedExpedition(expedition);
  };

  return (
    <div className="h-screen overflow-y-auto">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Pre-Cruise Approval
          </h1>
          {/* Dropdown for selecting an expedition */}
          <div className="mb-4">
            <label htmlFor="expedition-select" className="block mb-2 text-sm font-medium text-gray-900">Select an Expedition:</label>
            <select
              id="expedition-select"
              value={selectedExpedition.expeditionId}
              onChange={handleSelectChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {dummyExpeditions.map((expedition) => (
                <option key={expedition.expeditionId} value={expedition.expeditionId}>
                  {`ID ${expedition.expeditionId}: ${expedition.purpose}`}
                </option>
              ))}
            </select>
          </div>
          {/* Display selected expedition details */}
          <div>
            <h2 className="text-xl font-semibold">Expedition Details:</h2>
            <p><strong>Purpose:</strong> {selectedExpedition.purpose}</p>
            <p><strong>Scheduled Start Date:</strong> {selectedExpedition.scheduledStartDate}</p>
            <p><strong>Scheduled End Date:</strong> {selectedExpedition.scheduledEndDate}</p>
            <p><strong>Equipment:</strong> {selectedExpedition.equipmentDescription}</p>
            <p><strong>Participants:</strong> {selectedExpedition.participants}</p>
            <p><strong>Region Description:</strong> {selectedExpedition.regionDescription}</p>
            <p><strong>Planned Track:</strong> {selectedExpedition.plannedTrackDescription}</p>
            {/* ... display other properties as needed */}
          </div>
          <Modal isOpen={isModalOpen} closeModal={closeModal} confirmAction={confirmDeny}>
            Confirm Denial
          </Modal>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={openModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Deny
            </Button>
            <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreCruiseApproval;

//READY FOR API IMPLEMENTATION
// const PreCruiseApproval = () => {
//     const [expeditions, setExpeditions] = useState([]);
//     const [selectedExpedition, setSelectedExpedition] = useState(null);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const formatBoolean = (value: any) => (value ? 'Yes' : 'No');

//     const openModal = () => {
//              setModalOpen(true);
//            }
          
//            const closeModal = () => {
//              setModalOpen(false);
//            }
        
//            const confirmDeny = () => {
//              // Handle the deny action
//              console.log('Pre-cruise denied');
//              // Close the modal after confirming
//              closeModal();
//           };

//           const handleDeny = () => {
//             console.log('Expedition Denied:', selectedExpedition.expeditionId);
//             // Add logic to handle denial
//           };
        
//           const handleApprove = () => {
//             console.log('Expedition Approved:', selectedExpedition.expeditionId);
//             // Add logic to handle approval
//           };
  
//     // Fetch data from the API when the component mounts
//     useEffect(() => {
//       const fetchExpeditions = async () => {
//         try {
//           const response = await fetch('YOUR_API_ENDPOINT/expeditions'); // Replace with your API endpoint
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//           setExpeditions(data);
//         } catch (error) {
//           console.error("Fetching expeditions failed", error);
//         }
//       };
  
//       fetchExpeditions();
//     }, []);

// return (
//     <div className="h-screen overflow-y-auto">
//       <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
//       <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
//           <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
//             Pre-Cruise Approval
//           </h1>
//           {/* Dropdown for selecting an expedition */}
//           <div className="mb-4">
//                 <select
//                     onChange={(e) => {
//                         const expeditionId = Number(e.target.value);
//                         const expedition = expeditions.find(exp => exp.expeditionId === expeditionId);
//                         setSelectedExpedition(expedition ?? null); // Set to null if not found   
//                     }}
//                     className="form-select block w-full"
//                 >
//                     <option value="">Select an Expedition</option>
//                         {expeditions.map(exp => (
//                     <option key={exp.expeditionId} value={exp.expeditionId}>
//                         {exp.purpose} ({exp.scheduledStartDate} to {exp.scheduledEndDate})
//                     </option>
//                     ))}
//                 </select>
//           </div>
//           {/* Display selected expedition details */}
//           {selectedExpedition && (
//       <div className="my-4 p-4 border rounded">
//       <h3 className="text-lg font-bold">Expedition Details</h3>
//       <p><strong>ID:</strong> {selectedExpedition.expeditionId}</p>
//       <p><strong>Ship ID:</strong> {selectedExpedition.shipId}</p>
//       <p><strong>Purpose:</strong> {selectedExpedition.purpose}</p>
//       <p><strong>Chief Scientist ID:</strong> {selectedExpedition.chiefScientistId}</p>
//       <p><strong>Principal Investigator ID:</strong> {selectedExpedition.principalInvestigatorId}</p>
//       <p><strong>Scheduled Start Date:</strong> {selectedExpedition.scheduledStartDate}</p>
//       <p><strong>Scheduled End Date:</strong> {selectedExpedition.scheduledEndDate}</p>
//       <p><strong>Equipment Description:</strong> {selectedExpedition.equipmentDescription}</p>
//       <p><strong>Participants:</strong> {selectedExpedition.participants}</p>
//       <p><strong>Region Description:</strong> {selectedExpedition.regionDescription}</p>
//       <p><strong>Planned Track Description:</strong> {selectedExpedition.plannedTrackDescription}</p>
//       <p><strong>Actual Start Date:</strong> {selectedExpedition.actualStartDate}</p>
//       <p><strong>Actual End Date:</strong> {selectedExpedition.actualEndDate}</p>
//       <p><strong>Accomplishments:</strong> {selectedExpedition.accomplishments}</p>
//       <p><strong>Scientist Comments:</strong> {selectedExpedition.scientistComments}</p>
//       <p><strong>Scientific Objectives Met:</strong> {formatBoolean(selectedExpedition.sciObjectivesMet)}</p>
//       <p><strong>Operator Comments:</strong> {selectedExpedition.operatorComments}</p>
//       <p><strong>All Equipment Functioned:</strong> {formatBoolean(selectedExpedition.allEquipmentFunctioned)}</p>
//       <p><strong>Other Comments:</strong> {selectedExpedition.otherComments}</p>
//       {/* Approve and Deny buttons */}
//     </div>
//   )}
//           <Modal isOpen={isModalOpen} closeModal={closeModal} confirmAction={confirmDeny}>
//             Confirm Denial
//           </Modal>
//           <div className="flex justify-between items-center mt-4">
//             <Button onClick={openModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//               Deny
//             </Button>
//             <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//               Approve
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
// );
// };

// export default PreCruiseApproval;
