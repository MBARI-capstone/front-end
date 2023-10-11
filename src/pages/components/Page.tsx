import Link from "next/link";

export const Precruise = () => {
  return (
    <Link
      href="PreCruiseForm"
      className="inline-block group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
    >
      <div className="flex items-center justify-center h-full">
        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          Pre-Cruise
        </span>
      </div>
    </Link>
  );
};
export const Postcruise = () => {
  return (
    <Link
      href="PostCruiseForm"
      className="inline-block group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
    >
      <div className="flex items-center justify-center h-full">
        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          Post-Cruise
        </span>
      </div>
    </Link>
  );
};
export const Reports = () => {
  return (
    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
      <div className="relative flex items-center space-x-4 justify-center">
        <a href="">
          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            Reports
          </span>
        </a>
      </div>
    </button>
  );
};
export const Database = () => {
  return (
    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
      <div className="relative flex items-center space-x-4 justify-center">
        <a href="">
          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            Database
          </span>
        </a>
      </div>
    </button>
  );
};

export const Logout = () => {
  return (
    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
      <div className="relative flex items-center space-x-4 justify-center">
        <a href="">
          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            Logout
          </span>
        </a>
      </div>
    </button>
  );
};
