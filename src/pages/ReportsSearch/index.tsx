import { useState, SetStateAction} from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import { GetServerSideProps } from "next";

interface Ship {
  shipId: number;
  shipName: string;
  shipDescription?: string;
}

interface User {
  userId: number
  firstName: string
  lastName: string
}

interface ShipandUserprops {
  ships: Ship[]
  users: User[]
  error?: string
}

interface SearchParams {
  shipId: number | null;
  expeditionChiefScientistId: number | null;
  principalInvestigatorId: number | null;
  expeditionStartDate: string | null;
  expeditionEndDate: string | null;
  expeditionSequenceNumber: number | null;
  sciObjectivesMet: boolean | null;
  allEquipmentFunctioned: boolean | null;
  diveNumber: string | null;
  diveChiefScientistId: number | null;
  diveStartDate: string | null;
  diveEndDate: string | null;
  keyword: string | null;
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch your ships data here
  try {
    const shipsRes = await fetch(
      'http://localhost:8080/api/v1.1/data/allShips',
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: context.req.headers.cookie || '',
        },
      }
    )

    if (!shipsRes.ok) {
      throw new Error(`Error: ${shipsRes.status}`)
    }
    const ships = await shipsRes.json()
    console.log(ships)

    const registeredUsersRes = await fetch(
      'http://localhost:8080/api/v1.1/data/allUsers',
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: context.req.headers.cookie || '',
        },
      }
    )
    if (!registeredUsersRes.ok) {
      throw new Error(`Error: ${registeredUsersRes.status}`)
    }
    const users = await registeredUsersRes.json()
    console.log(users)

    return {
      props: {
        ships,
        users,
      },
    }
  } catch (error: any) {
    // In case of an error, you can return an error prop, or you can choose to handle it differently
    return { props: { error: error.message } }
  }
}

const ReportsSearch: React.FC<ShipandUserprops> = ({
  ships, 
  users,
  error,
}) => {

  const [selectedShipId, setSelectedShipId] = useState<number | undefined>()
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>()
  const [selectPrincipleID, setPrincipleId] = useState<number | undefined>()
  // State to hold the search parameters
  const [searchParams, setSearchParams] = useState<SearchParams>({
    shipId: null,
    expeditionChiefScientistId: null,
    principalInvestigatorId: null,
    expeditionStartDate: null,
    expeditionEndDate: null,
    expeditionSequenceNumber: null,
    sciObjectivesMet: null,
    allEquipmentFunctioned: null,
    diveNumber: null,
    diveChiefScientistId: null,
    diveStartDate: null,
    diveEndDate: null,
    keyword: null,
  });

  //State to hold the search results
  const [searchResults, setSearchResults] = useState<SearchParams[]>([]);

  //Function to handle input changes and update search parameters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Function to execute the search
  const executeSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1.1/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to search:", error);
    }
  };

  const filterResults = () => {
    return searchResults.filter((result) => {
      return (
        (searchParams.shipId === null|| result.shipId === searchParams.shipId ) &&  
        (searchParams.expeditionChiefScientistId === null || result.expeditionChiefScientistId === searchParams.expeditionChiefScientistId) &&
        (searchParams.principalInvestigatorId === null || result.principalInvestigatorId === searchParams.principalInvestigatorId) &&
        (searchParams.expeditionStartDate === null || result.expeditionStartDate === searchParams.expeditionStartDate) && 
        (searchParams.expeditionEndDate === null || result.expeditionEndDate === searchParams.expeditionEndDate) &&
        (searchParams.expeditionSequenceNumber === null || result.expeditionSequenceNumber == searchParams.expeditionSequenceNumber) &&
        (searchParams.sciObjectivesMet === null || result.sciObjectivesMet === searchParams.sciObjectivesMet) &&
        (searchParams.allEquipmentFunctioned === null || result.allEquipmentFunctioned === searchParams.allEquipmentFunctioned) &&
        (searchParams.diveNumber === null || result.diveNumber === searchParams.diveNumber) &&
        (searchParams.diveChiefScientistId === null || result.diveChiefScientistId === searchParams.diveChiefScientistId) &&
        (searchParams.diveStartDate === null || result.diveStartDate === searchParams.diveStartDate) && 
        (searchParams.diveEndDate === null || result.diveEndDate === searchParams.diveEndDate) && 
        (searchParams.keyword === null || result.keyword === searchParams.keyword)
      );
    });
  };


  const renderSearchResults = () => {
    const filteredResults = filterResults();

    if (filteredResults.length === 0){
      return <p> No Matching Results</p>
    }

    return filteredResults.map((result) => (
      <div key={result.shipId}>
        {/* Render your search result items here */}
        <p>{result.shipId}</p>
      </div>
    ));
  };

  const handleShipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shipId = parseInt(event.target.value, 10)
    setSelectedShipId(shipId)
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10)
    setSelectedUserId(userId)
  }

  const handlePrincipleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userId = parseInt(event.target.value, 10)
    setPrincipleId(userId)
  }
  
  return (
    <main>
      <div className="h-screen  overflow-y-auto ">
        <Navbar currentPage="precruise" className="sticky top-0 z-10" />
        <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
            <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
              Advanced Search of Expedition Database
            </h1>

            <p className="mb-4 text-sm text-center italic">
              Enter any of the parameters below to restrict search for
              expeditions.
            </p>

            <form method="post">
              <div className="searchInputs">
                {/* <!-- here is for selectors shared by both pre and post cruise, INCLUDING text entry for all text fields -->
          <!-- INCLUDES: purpose, equipmentDescription, regionDescription, plannedTrackDescription, participants, acomplishmnts, scientistComments, opperatorComments, otherComments, & briefAccomplishments (from dive) --> */}
                <div className="globalSelectors">
                  <p className="mb-4 text-sm text-center italic">
                    Search for an Expedition by Expedition Parameters
                  </p>

                  <div className="flex flex-row">
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
                        className="block appearance-none w-full bg-white border border-gray-400  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        
                      >
                        <option value="">(Select One)</option>
                        <option value="1">Scientist 1</option>
                        <option value="2">Scientist 2</option>
                        <option value="3">Scientist 3</option>
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
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        
                      >
                        <option value="">(Select One)</option>
                        <option value="1">Investigator 1</option>
                        <option value="2">Investigator 2</option>
                        <option value="3">Investigator 3</option>
                      </select>
                    </label>
                  </div>
                  <br />
                  <div className="flex flex-row">
                    <label
                      htmlFor="scheduledStartDatetime"
                      className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                    >
                      Start Date:
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>

                    <label
                      htmlFor="endDate"
                      className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                    >
                      End Date:
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>

                    
                  </div>
                  <div className="flex">
                    <div className="flex-1 flex flex-col p-4 ">
                      <div>
                        <label
                          htmlFor="SequenceNumberSearch"
                          className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                        >
                          Sequence Number:
                          <input
                            id="SequenceNumberSearch"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            name="SequenceNumberSearch"
                            type="string"
                          ></input>
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="status"
                          className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                        >
                          Status(Objective Met):
                          <select
                            id="status"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            
                          >
                            <option value="">(Select One)</option>
                            <option value="1">Complete</option>
                            <option value="2">Incomplete</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col p-4 ">
                      <div>
                        <label
                          htmlFor="yyyyddd"
                          className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                        >
                          YYYYDDD:
                          <input
                            id="SequenceNumberSearch"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            name="SequenceNumberSearch"
                            type="string"
                          ></input>
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="status"
                          className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                        >
                          Status(Equipment Functioned):
                          <select
                            id="status"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            
                          >
                            <option value="">(Select One)</option>
                            <option value="1">Complete</option>
                            <option value="2">Incomplete</option>
                          </select>
                        </label>
                      </div>
                    </div> 
                  </div>
                  <div className="flex flex-row">
                  <label
                      htmlFor="chiefScientist"
                      className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1 mr-4"
                    >
                      Dive Chief Scientist ID:
                      <select
                        id="chiefScientist"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        
                      >
                        <option value="">(Select One)</option>
                        <option value="1">Scientist 1</option>
                        <option value="2">Scientist 2</option>
                        <option value="3">Scientist 3</option>
                      </select>
                    </label>
                    <label
                          htmlFor="SequenceNumberSearch"
                          className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1 mr-4 "
                        >
                          Dive Number:
                          <input
                            id="SequenceNumberSearch"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            name="SequenceNumberSearch"
                            type="string"
                          ></input>
                        </label>
                    
                  </div>
                
                </div>
              </div>
              <div className="flex flex-wrap">
              <label
                      htmlFor="diveStartDate"
                      className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                    >
                      Dive Start Time:
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>

                    <label
                      htmlFor="diveEndDate"
                      className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1"
                    >
                      Dive End Time:
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>

              
                <div className="w-full pb-4">
                  <label
                    htmlFor="keywordSearch"
                    className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
                  >
                    Key-word or Phrase
                  </label>
                  <textarea
                    id="keywordSearch"
                    name="keywordSearch"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                    cols={30}
                    placeholder="Enter a keyword or phrase to search all text fields."
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{" "}
              <button onClick={executeSearch}>Search</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportsSearch;
