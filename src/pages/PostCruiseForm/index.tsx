import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/button";
import BackButton from "../components/BackButton";

const postCruiseForm = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <Navbar currentPage="postcruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Post-Cruise Form
          </h1>

          <form method="post">
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
                  id="scheduledEndDatetime"
                  name="scheduledEndDatetime"
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
                  id="scheduledEndDatetime"
                  name="scheduledEndDatetime"
                  className=" shadow leading-tight focus:outline-none focus:shadow-outline border border-gray-300  text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Acomplishments:{" "}
              <textarea
                id="acomplishments"
                name="acomplishments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="acomplishments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Scientist Comments:{" "}
              <textarea
                id="scientistComments"
                name="scientistComments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="scientistComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            <label
              htmlFor="accomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Scientist Objectives Met?:{" "}
              <input
                type="checkbox"
                id="sciObjectivesMet"
                name="sciObjectivesMet"
              ></input>
            </label>
            <label
              htmlFor="equipmentFunctioned"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              All Equipment Functioned?:{" "}
              <input
                type="checkbox"
                id="allEquipmentFunctioned"
                name="allEquipmentFunctioned"
              ></input>
            </label>
            <label
              htmlFor="operatorComments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Operator Comments:{" "}
              <textarea
                id="operatorComments"
                name="operatorComments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="operatorComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>

            <label
              htmlFor="otherComments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Other Comments:{" "}
              <textarea
                id="otherComments"
                name="otherComments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="otherComments (up to 8000 character text field)"
                required
              ></textarea>
            </label>
            {/* <!-- Need to also submit the ID of the user who submitted the form, will be recorded on database, but not listed on form. Can be retrieved from database based on who is logged in --> */}
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

export default postCruiseForm;
