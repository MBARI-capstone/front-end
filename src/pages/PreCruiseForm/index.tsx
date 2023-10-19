import React from "react";

import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const preCruiseForm = () => {
  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Pre-Cruise Form
          </h1>
          <form method="post">
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
              <label
                htmlFor="purpose"
                className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
              >
                Purpose for cruise:
                <br />
                <textarea
                  id="purpose"
                  name="purpose"
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
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </div>
                  <input
                    type="date"
                    id="scheduledEndDatetime"
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
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </div>
                  <input
                    type="date"
                    id="scheduledEndDatetime"
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
                  className="w-full border max-h-[150px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Planned Track Description (up to 6144 character text field)"
                  required
                ></textarea>
              </label>
            </fieldset>
            <div>
              <div className="flex ">
                <input
                  type="submit"
                  className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline mx-2"
                  value="Submit"
                />
                {/* <button onclick="window.location.href='../pageSelector.html'" id="back" name="back">Back</button> */}
                <div></div>
                <BackButton hrefLink="/PageSelect" buttonName="Back" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default preCruiseForm;
