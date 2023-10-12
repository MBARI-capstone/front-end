import Link from "next/link";
import React, { useState } from "react";
import SignInbutton from "./SignInbutton";

const Login = ({ href }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const checkValidUser = () => {
    //Simulated validation Logic
    const validUsers = [
      { username: "mbariemployee", password: "pass1" },
      { username: "registerduser", password: "pass2" },
      { username: "logcordinator", password: "pass3" },
      { username: "admin", password: "pass4" },
    ];

    const isValid = validUsers.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      console.log("Valid user!");
      // Handle success (e.g., navigate to another page)
    } else {
      console.log("Invalid user!");
      // Handle failure (e.g., show an error message)
    }
  };
  return (
    <>
      
      <div className="flex min-h-md flex-1 flex-col justify-center px-6 py-1 lg:px-8">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-cyan-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-center h-full  ">
              {/* <SignInbutton onSignIn={() => checkValidUser} /> */}
              {/* <button onClick={() => router.push('/pageSelect')}>login</button> */}
              <div className="flex items-center justify-center h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <Link href={href}>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
