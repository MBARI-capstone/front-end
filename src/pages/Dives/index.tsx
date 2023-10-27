import React from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const Dives = () => {
  return (
    <div className="h-screen  overflow-y-auto ">
      <Navbar currentPage="precruise" className="sticky top-0 z-10" />
      <div className="bg-custom-blue flex flex-col items-center justify-center font-sans text-cyan-900 pt-24">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
          <h1 className="mb-2 text-2xl text-center text-cyan-900 font-bold">
            Dive Form
          </h1>

          <p className="mb-4 text-sm text-center italic">
            Please fill out all the information below in order to add a dive to
            this cruise.
          </p>
          <form method="post">
            <label
              htmlFor="rovName"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              ROV Name:
              <select id="rovName" className="border rounded-md ml-2" required>
                <option value="">(Select One)</option>
                <option value="1">ROV 1</option>
                <option value="2">ROV 2</option>
                <option value="3">ROV 3</option>
              </select>
            </label>
            <p className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2">
              Time of Dive:
            </p>
            <label
              htmlFor="diveTime"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Start
              <input
                type="datetime-local"
                id="diveTimeStart"
                name="diveTimeStart"
                className="ml-2 w-60 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                required
              ></input>
              <span className="ml-4">End</span>
              <input
                type="datetime-local"
                id="diveTimeEnd"
                className="ml-2 w-60 border rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                name="diveTimeEnd"
                required
              ></input>
            </label>
            ​
            <label
              htmlFor="chiefScientist"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Dive Chief Scientist:
              <select
                id="chiefScientist"
                className="border rounded-md ml-2"
                required
              >
                <option value="">(Select One)</option>
                <option value="1">Scientist 1</option>
                <option value="2">Scientist 2</option>
                <option value="3">Scientist 3</option>
              </select>
            </label>
            ​
            <label
              htmlFor="acomplishments"
              className="block uppercase tracking-wide text-cyan-900 text-md font-bold mb-2"
            >
              Dive Accomplishments:
              <textarea
                id="acomplishments"
                name="acomplishments"
                className="w-full border max-h-[100px] rounded-md p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                cols={30}
                placeholder="A brief explination of what was accomplished on this dive."
              ></textarea>
            </label>
            {/* <!-- Save the user ID when they add a dive --> */}
            {/* <label htmlFor="diveNumber">ID of who added expedition to database:
          <input id="diveNumber" name="diveNumber" type="number"></input>
        </label> */}
            <div className="flex flex-wrap">
              {/* This creates a flexible space */}
              <BackButton hrefLink="/PageSelect" buttonName="Back" />
              <div className="flex-1"></div>{" "}
              <input
                type="submit"
                className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline mx-2"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dives;
