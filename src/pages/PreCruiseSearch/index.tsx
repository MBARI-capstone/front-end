import React from 'react'
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const PreCruiseSearch = () => {
  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Pre-Cruise Search Form
          </h1>
          <form method="post">
            <fieldset>
              <p className="mb-4 text-sm text-center italic">
                Search for Pre-Cruise to Add Post Cruise Form 
              </p>
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
              <br />
              <div className="flex flex-wrap">
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
                            
            </fieldset>
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{" "}
              <BackButton hrefLink="/PostCruiseForm" buttonName="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreCruiseSearch