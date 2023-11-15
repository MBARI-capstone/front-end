import { useState, useEffect } from "react";
import { GetServerSideProps } from 'next'

import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

interface Ship {
  shipId: number;
  shipName: string;
  shipDescription?: string;
}

interface User {
  userId: number;
  firstName: string;
  lastName: string;
}

interface PreCruiseFormProps {
  ships: Ship[];
  users: User[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch your ships data here
  try {
    const shipsRes = await fetch('http://localhost:8080/api/v1.1/data/allShips',
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: context.req.headers.cookie || '',
        },
      }
    )
    
    if (!shipsRes.ok) {
      throw new Error(`Error: ${shipsRes.status}`);
    }
    const ships = await shipsRes.json();
    console.log(ships);

    const registeredUsersRes = await fetch('http://localhost:8080/api/v1.1/data/allUsers',
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: context.req.headers.cookie || '',
      },
    }
    );
    if (!registeredUsersRes.ok) {
      throw new Error(`Error: ${registeredUsersRes.status}`);
    }
    const users = await registeredUsersRes.json();
    console.log(users); 

    return {
      props: {
        ships,
        users,
      },
    };
  } catch (error) {
    // In case of an error, you can return an error prop, or you can choose to handle it differently
    return { props: { error: error.message } };
  }
}
  

const PreCruiseForm: React.FC<PreCruiseFormProps> = ({ ships, users, error }) => {

  const [submissionStatus, setSubmissionStatus] = useState({ status: '', message: '' });

   // State to store the selected ship ID
  const [selectedShipId, setSelectedShipId] = useState<number | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [selectPrincipleID, setPrincipleId] = useState<number | undefined>();
  const [purpose, setPurpose] = useState('');
  const [scheduledStartDate, setScheduledStartDate] = useState('');
  const [scheduledEndDate, setScheduledEndDate] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [regionDescription, setRegionDescription] = useState('');
  const [plannedTrackDescription, setPlannedTrackDescription] = useState('');

  const handlePurposeChange = (e) => setPurpose(e.target.value);
  const handleScheduledStartDateChange = (e) => setScheduledStartDate(e.target.value);
  const handleScheduledEndDateChange = (e) => setScheduledEndDate(e.target.value);
  const handleEquipmentDescriptionChange = (e) => setEquipmentDescription(e.target.value);
  const handleParticipantsChange = (e) => setParticipants(e.target.value);
  const handleRegionDescriptionChange = (e) => setRegionDescription(e.target.value);
  const handlePlannedTrackDescriptionChange = (e) => setPlannedTrackDescription(e.target.value);

   const handleShipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shipId = parseInt(event.target.value, 10);
    setSelectedShipId(shipId);

   };

   const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setSelectedUserId(userId);
   };

   const handlePrincipleChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setPrincipleId(userId);
   };

   const handleSubmit = async (event) => {
    event.preventDefault();
    const preExpeditionData = {
      shipId: selectedShipId,
      chiefScientistId: selectedUserId,
      principalInvestigatorId: selectPrincipleID,
      purpose,
      scheduledStartDate,
      scheduledEndDate,
      equipmentDescription,
      participants,
      regionDescription,
      plannedTrackDescription,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1.1/preExpedition', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preExpeditionData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const clonedResponse = response.clone();

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Response is not valid JSON:', jsonError);
        // Read the cloned response as text
        const textResult = await clonedResponse.text();
        console.error('Response as text:', textResult);
        // Handle the non-JSON response (e.g., error message) here
        throw new Error('Response is not in JSON format.');
      }
    
      setSubmissionStatus({ status: 'success', message: result.message || 'Form submitted successfully!' });
    
    } catch (error) {
      console.error('Error posting data:', error);
      setSubmissionStatus({ status: 'error', message: error.message || 'Failed to submit the form.' });
    }
  
  };

   

   if (error) {
    return <div>Error fetching ships: {error}</div>;
  }

  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">

      {submissionStatus.message && (
        <div className={`alert ${submissionStatus.status === 'success' ? 'alert-success' : 'alert-error'}`}>
          {submissionStatus.message}
        </div>
      )}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Pre-Cruise Form
          </h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <p className="mb-4 text-sm text-center italic">
                Please fill out all the information below in order to submit a
                request for a pre cruise approval.
              </p>
              <div className="flex flex-wrap">
                <label
                  htmlFor="shipName"
                  className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1 mr-4"
                >
                  Ship Name:
                  <select
                    id="shipName"
                    name="shipName"
                    onChange={handleShipChange}
                    value={selectedShipId || ''}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                  <option value="">(Select a Ship)</option>
                    {ships.map((ship) => (
                  <option key={ship.shipId} value={ship.shipId}>
                    {ship.shipName}
                  </option>
                     ))}
                  </select>
                </label>
                <br />

                <label
                  htmlFor="chiefScientist"
                  className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1 mr-4"
                >
                  Chief Scientist:
                  <select
                    id="chiefScientist"
                    name="chiefScientist"
                    onChange={handleUserChange}
                    value={selectedUserId || ''}
                    className="block appearance-none w-full bg-white border border-gray-400  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">(Select Chief Scientist)</option>
                    {users.map((user) => (
                      <option  key={user.userId} value={user.userId}>
                         {`${user.firstName}`}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label
                  htmlFor="principalInvestigator"
                  className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                >
                  Principal Investigator:
                  <select
                    id="principalInvestigator"
                    name="principleInvestigator"
                    onChange={handlePrincipleChange}
                    value={selectPrincipleID || ''}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">(Select Principal Investigator)</option>
                    {users.map((user) => (
                      <option  key={user.userId} value={user.userId}>
                         {`${user.firstName}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label
                htmlFor="purpose"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Purpose for cruise:
                <br />
                <textarea
                  id="purpose"
                  name="purpose"
                  onChange={handlePurposeChange}
                  value={purpose || ''}
                  rows={3}
                  cols={30}
                  className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Purpose of cruise (up to 8000 character text field)"
                  required
                ></textarea>
              </label>

              
              <label
                htmlFor="scheduledStartDatetime"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Scheduled Start Date time:
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                   
                  </div>
                  <input
                    type="date"
                    id="scheduledEndDatetime"
                    onChange={handleScheduledStartDateChange}
                    value={scheduledStartDate || ''}
                    name="scheduledEndDatetime"
                    className=" shadow leading-tight focus:outline-none focus:shadow-outline border border-gray-300  text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    required
                  ></input>
                </div>
              </label>
              <br />
              <label
                htmlFor="scheduledEndDatetime"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Scheduled End Date time:
                <div className="relative max-w-sm">
                  <input
                    type="date"
                    id="scheduledEndDatetime"
                    onChange={handleScheduledEndDateChange}
                    value={scheduledEndDate || ''}
                    name="scheduledEndDatetime"
                    className=" shadow leading-tight focus:outline-none focus:shadow-outline border border-gray-300  text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  ></input>
                </div>
              </label>
              <br />
              <label
                htmlFor="equipmentDescription"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Equipment Description:
                <textarea
                  id="equipmentDescription"
                  name="equipmentDescription"
                  rows={3}
                  cols={30}
                  onChange={handleEquipmentDescriptionChange}
                  value={equipmentDescription || ''}
                  className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Equipment Description (up to 8000 character text field)"
                  required
                ></textarea>
              </label>
              
              <label
                htmlFor="participants"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Participants:
                <textarea
                  id="participants"
                  name="participants"
                  rows={3}
                  cols={30}
                  onChange={handleParticipantsChange}
                  value={participants || ''}
                  className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="participants (up to 8000 character text field)"
                  required
                ></textarea>
              </label>
              
              <label
                htmlFor="regionDescription"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Region Description:
                <textarea
                  id="regionDescription"
                  name="regionDescription"
                  rows={3}
                  cols={30}
                  onChange={handleRegionDescriptionChange}
                  value={regionDescription || ''}
                  className="w-full border max-h-[150px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Region Description (up to 2048 character text field)"
                  required
                ></textarea>
              </label>
              
              <label
                htmlFor="plannedTrackDescription"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Planned Track Description:
                <textarea
                  id="plannedTrackDescription"
                  name="plannedTrackDescription"
                  rows={3}
                  cols={30}
                  onChange={handlePlannedTrackDescriptionChange}
                  value={plannedTrackDescription || ''}
                  className="w-full border max-h-[150px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Planned Track Description (up to 6144 character text field)"
                  required
                ></textarea>
              </label>
            </fieldset>
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{" "}
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
  );
};

export default PreCruiseForm;
