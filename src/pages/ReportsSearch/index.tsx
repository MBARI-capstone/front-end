import { useState, SetStateAction } from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import { GetServerSideProps } from "next";
import moment from "moment";

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

interface ShipandUserprops {
  ships: Ship[];
  users: User[];
  error?: string;
}

interface RovDive {
  rovName: string;
  diveNumber: string;
  diveStartDatetime: string;
  diveEndDatetime: string;
  diveChiefScientistName: string;
}

interface SearchResults {
  accomplishments: string;
  actualEndDate: string;
  actualStartDate: string;
  allEquipmentFunctioned: boolean;
  equipmentDescription: string;
  expeditionChiefScientistName: string;
  expeditionId: number;
  isPreApproved: boolean | null;
  operatorComments: string;
  otherComments: string;
  participants: string;
  plannedTrackDescription: string;
  principalInvestigatorName: string;
  purpose: string;
  regionDescription: string;
  rovDives: RovDive[];
  scheduledEndDate: string;
  scheduledStartDate: string;
  sciObjectivesMet: boolean;
  scientistComments: string;
  shipName: string;
  updatedByUserName: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch your ships data here
  try {
    const shipsRes = await fetch(
      "http://localhost:8080/api/v1.1/data/allShips",
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie || "",
        },
      }
    );

    if (!shipsRes.ok) {
      throw new Error(`Error: ${shipsRes.status}`);
    }
    const ships = await shipsRes.json();
    console.log(ships);

    const registeredUsersRes = await fetch(
      "http://localhost:8080/api/v1.1/data/allUsers",
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie || "",
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
  } catch (error: any) {
    // In case of an error, you can return an error prop, or you can choose to handle it differently
    return { props: { error: error.message } };
  }
};

const ReportsSearch: React.FC<ShipandUserprops> = ({ ships, users, error }) => {
  const [shipId, setShipId] = useState<number | null>(null);
  const [expeditionChiefScientistId, setExpeditionChiefScientistId] = useState<
    number | null
  >(null);
  const [principalInvestigatorId, setPrincipalInvestigatorId] = useState<
    number | null
  >(null);
  const [expeditionStartDate, setExpeditionStartDate] = useState<string | null>(
    null
  );
  const [expeditionEndDate, setExpeditionEndDate] = useState<string | null>(
    null
  );
  const [expeditionSequenceNumber, setExpeditionSequenceNumber] = useState<
    number | null
  >(null);
  const [sciObjectivesMet, setSciObjectivesMet] = useState<boolean | null>(
    null
  );
  const [allEquipmentFunctioned, setAllEquipmentFunctioned] = useState<
    boolean | null
  >(null);
  const [diveNumber, setDiveNumber] = useState<string | null>(null);
  const [diveChiefScientistId, setDiveChiefScientistId] = useState<
    number | null
  >(null);
  const [diveStartDate, setDiveStartDate] = useState<string | null>(null);
  const [diveEndDate, setDiveEndDate] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);

  //State to hold the search results
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  //Function to handle input changes and update search parameters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "expeditionStartDate":
        setExpeditionStartDate(value);
        break;
      case "expeditionEndDate":
        setExpeditionEndDate(value);
        break;
      case "expeditionSequenceNumber":
        setExpeditionSequenceNumber(value ? parseInt(value, 10) : null);
        break;
      case "sciObjectivesMet":
        setSciObjectivesMet(value === "true");
        break;
      case "allEquipmentFunctioned":
        setAllEquipmentFunctioned(value === "true");
        break;
      case "diveNumber":
        setDiveNumber(value);
        break;
      case "diveStartDate":
        setDiveStartDate(value);
        break;
      case "diveEndDate":
        setDiveEndDate(value);
        break;
      case "keyword":
        setKeyword(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "shipName":
        setShipId(value ? parseInt(value, 10) : null);
        break;
      case "chiefScientist":
        setExpeditionChiefScientistId(value ? parseInt(value, 10) : null);
        break;
      case "principalInvestigator":
        setPrincipalInvestigatorId(value ? parseInt(value, 10) : null);
        break;
      case "diveChiefScientist":
        setDiveChiefScientistId(value ? parseInt(value, 10) : null);
        break;
      case "sciObjectivesMet":
        setSciObjectivesMet(value === "true");
        break;
      case "allEquipmentFunctioned":
        setAllEquipmentFunctioned(value === "true");
        break;
      default:
        break;
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "keyword":
        setKeyword(value);
        break;
      default:
        break;
    }
  };

  // Function to execute the search
  const executeSearch = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const searchParams = {
      shipId: shipId,
      expeditionChiefScientistId: expeditionChiefScientistId,
      principalInvestigatorId: principalInvestigatorId,
      expeditionStartDate: expeditionStartDate,
      expeditionEndDate: expeditionEndDate,
      expeditionSequenceNumber: expeditionSequenceNumber,
      sciObjectivesMet: sciObjectivesMet,
      allEquipmentFunctioned: allEquipmentFunctioned,
      diveNumber: diveNumber,
      diveChiefScientistId: diveChiefScientistId,
      diveStartDate: diveStartDate,
      diveEndDate: diveEndDate,
      keyword: keyword,
    };

    console.log("search parameter: ", searchParams);
    try {
      const response = await fetch("http://localhost:8080/api/v1.1/search", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to search:", error);
    }
  };

  const [openExpeditionId, setOpenExpeditionId] = useState<number | null>(null);
  const [openRovDiveIds, setOpenRovDiveIds] = useState<Set<string>>(new Set());

  const toggleExpedition = (expeditionId: number) => {
    setOpenExpeditionId(
      openExpeditionId === expeditionId ? null : expeditionId
    );
  };

  const toggleRovDive = (expeditionId: number, diveIndex: number) => {
    const key = `${expeditionId}-${diveIndex}`;
    const newOpenRovDiveIds = new Set(openRovDiveIds);
    if (newOpenRovDiveIds.has(key)) {
      newOpenRovDiveIds.delete(key);
    } else {
      newOpenRovDiveIds.add(key);
    }
    setOpenRovDiveIds(newOpenRovDiveIds);
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p> No Matching Results</p>;
    }

    return (
      <div>
        {searchResults.map((result: SearchResults) => (
          <div key={result.expeditionId} className="mb-4">
            <div
              onClick={() => toggleExpedition(result.expeditionId)}
              className="cursor-pointer font-bold text-lg border p-1 "
            >
              {result.shipName} ({result.actualStartDate} -{" "}
              {result.actualEndDate})
              {openExpeditionId === result.expeditionId ? " ↓" : " →"}
            </div>
            {openExpeditionId === result.expeditionId && (
              <div className="pl-4 border-l-2 border-gray-300">
                <p>Purpose: {result.purpose}</p>
                <p>Chief Scientist: {result.expeditionChiefScientistName}</p>
                <p>
                  Principal Investigator: {result.principalInvestigatorName}
                </p>
                <p>Start Date: {result.actualStartDate}</p>
                <p>End Date: {result.actualEndDate}</p>
                <p>Region: {result.regionDescription}</p>
                <p>Equipment: {result.equipmentDescription}</p>
                <p>Participants: {result.participants}</p>
                <p>Accomplishments: {result.accomplishments}</p>
                <h2 className="font-semibold text-md mt-2">Dives:</h2>
                <div className="mt-2">
                  {result.rovDives.map((dive, index) => (
                    <div key={index} className="mb-2">
                      <div
                        onClick={() =>
                          toggleRovDive(result.expeditionId, index)
                        }
                        className="cursor-pointer pl-4 border-l-2 border-gray-200"
                      >
                        <span className="font-semibold">{dive.rovName}</span> (
                        {dive.diveStartDatetime} - {dive.diveEndDatetime}){" "}
                        {openRovDiveIds.has(`${result.expeditionId}-${index}`)
                          ? " ↓"
                          : " →"}
                      </div>
                      {openRovDiveIds.has(
                        `${result.expeditionId}-${index}`
                      ) && (
                        <div className="pl-8">
                          <p>
                            Dive Chief Scientist: {dive.diveChiefScientistName}
                          </p>
                          <p>Dive Number: {dive.diveNumber}</p>
                          <p>Start Date/Time: {dive.diveStartDatetime}</p>
                          <p>End Date/Time: {dive.diveEndDatetime}</p>

                          <p>ROV Name: {dive.rovName}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

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
                      className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1 mr-4"
                    >
                      Ship Name:
                      <select
                        id="shipName"
                        name="shipName"
                        onChange={handleSelectChange}
                        value={shipId || ""}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">(Select a Ship)</option>
                        {ships.map((ship) => (
                          <option key={ship.shipId} value={ship.shipId}>
                            {ships && ship.shipName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <br />

                    <label
                      htmlFor="chiefScientist"
                      className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1 mr-4"
                    >
                      Chief Scientist:
                      <select
                        id="chiefScientist"
                        name="chiefScientist"
                        onChange={handleSelectChange}
                        value={expeditionChiefScientistId || ""}
                        className="block appearance-none w-full bg-white border border-gray-400  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">(Select Chief Scientist)</option>
                        {users.map((user) => (
                          <option key={user.userId} value={user.userId}>
                            {`${user.firstName}`}
                          </option>
                        ))}
                      </select>
                    </label>
                    <br />
                    <label
                      htmlFor="principalInvestigator"
                      className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                    >
                      Principal Investigator:
                      <select
                        id="principalInvestigator"
                        name="principleInvestigator"
                        onChange={handleSelectChange}
                        value={principalInvestigatorId || ""}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">
                          (Select Principal Investigator)
                        </option>
                        {users.map((user) => (
                          <option key={user.userId} value={user.userId}>
                            {`${user.firstName}`}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <br />
                  <div className="flex flex-row">
                    <label
                      htmlFor="scheduledStartDatetime"
                      className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                    >
                      Start Date:
                      <input
                        type="datetime-local"
                        id="startDate"
                        name="expeditionStartDate"
                        value={expeditionStartDate || ""}
                        onChange={handleInputChange}
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>

                    <label
                      htmlFor="endDate"
                      className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                    >
                      End Date:
                      <input
                        type="datetime-local"
                        id="endDate"
                        name="expeditionEndDate"
                        value={expeditionEndDate || ""}
                        onChange={handleInputChange}
                        className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                      ></input>
                    </label>
                  </div>
                  <div className="flex">
                    <div className="flex-1 flex flex-col p-4 ">
                      <div>
                        <label
                          htmlFor="SequenceNumberSearch"
                          className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                        >
                          Sequence Number:
                          <input
                            id="SequenceNumberSearch"
                            name="expeditionSequenceNumber"
                            value={expeditionSequenceNumber || ""}
                            onChange={handleInputChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="string"
                          ></input>
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="status"
                          className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                        >
                          Status(Objective Met):
                          <select
                            id="status"
                            name="sciObjectivesMet"
                            value={sciObjectivesMet?.toString() || ""}
                            onChange={handleSelectChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">(Select One)</option>
                            <option value="true">Complete</option>
                            <option value="false">Incomplete</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col p-4 ">
                      <div>
                        <label
                          htmlFor="status"
                          className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                        >
                          Status(Equipment Functioned):
                          <select
                            id="status"
                            name="allEquipmentFunctioned"
                            value={allEquipmentFunctioned?.toString() || ""}
                            onChange={handleSelectChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">(Select One)</option>
                            <option value="true">Complete</option>
                            <option value="false">Incomplete</option>
                          </select>
                        </label>
                        <label
                          htmlFor="chiefScientist"
                          className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1 mr-4"
                        >
                          Dive Chief Scientist ID:
                          <select
                            id="chiefScientist"
                            name="diveChiefScientistId"
                            value={diveChiefScientistId || ""}
                            onChange={handleSelectChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">(Select Dive Scientist)</option>
                            {users.map((user) => (
                              <option key={user.userId} value={user.userId}>
                                {`${user.firstName}`}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-3 p-3">
                <label
                  htmlFor="SequenceNumberSearch"
                  className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1 mr-4 "
                >
                  Dive Number:
                  <input
                    id="diveNumber"
                    name="diveNumber"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={diveNumber || ""}
                    onChange={handleInputChange}
                    type="string"
                  ></input>
                </label>

                <label
                  htmlFor="diveStartDate"
                  className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                >
                  Dive Start Time:
                  <input
                    type="date"
                    id="diveStartDate"
                    name="divestartDate"
                    value={diveStartDate || ""}
                    onChange={handleInputChange}
                    className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  ></input>
                </label>

                <label
                  htmlFor="diveEndDate"
                  className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2 flex-1"
                >
                  Dive End Time:
                  <input
                    type="datetime-local"
                    id="diveEndDate"
                    name="diveEndDate"
                    value={diveEndDate || ""}
                    onChange={handleInputChange}
                    className="ml-2 w-40 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  ></input>
                </label>
              </div>
              <div className="w-full pb-4">
                <label
                  htmlFor="keywordSearch"
                  className="block uppercase tracking-wide text-cyan-900 text-sm font-bold mb-2"
                >
                  Key-word or Phrase
                </label>
                <textarea
                  id="keyword"
                  name="keyword"
                  value={keyword || ""}
                  onChange={handleTextareaChange}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  cols={30}
                  placeholder="Enter a keyword or phrase to search all text fields."
                ></textarea>
              </div>

              <div className="flex flex-wrap">
                {/* This creates a flexible space */}
                <BackButton hrefLink="/PageSelect" buttonName="Back" />
                <div className="flex-1"></div>{" "}
                <button className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={executeSearch}>Search</button>
              </div>
            </form>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
            <h1 className=" text-xl text-center font-bold ">Search Results</h1>
            <div className="search-results-container">
              {renderSearchResults()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportsSearch;
