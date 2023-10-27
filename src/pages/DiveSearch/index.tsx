import React from 'react'
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const DiveSearch = () => {
  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Add Dive to Expedition
          </h1>

          <p className="mb-4 text-sm text-center italic">
            Choose Expedition to add dive to.
          </p>
          <form method="post">
          <div className="flex flex-wrap">
                <label
                  htmlFor="shipName"
                  className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2 flex-1 mr-4"
                >
                  Ship Name:
                  <select
                    id="shipName"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">(Select One)</option>
                    <option value="1">Ship 1</option>
                    <option value="2">Ship 2</option>
                    <option value="3">Ship 3</option>
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
                    required
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
                    required
                  >
                    <option value="">(Select One)</option>
                    <option value="1">Investigator 1</option>
                    <option value="2">Investigator 2</option>
                    <option value="3">Investigator 3</option>
                  </select>
                </label>
              </div>


              
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
            {/* <!-- Save the user ID when they add a dive --> */}
            {/* <label htmlFor="diveNumber">ID of who added expedition to database:
          <input id="diveNumber" name="diveNumber" type="number"></input>
        </label> */}
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{" "}
              <BackButton hrefLink="/Dives" buttonName="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DiveSearch