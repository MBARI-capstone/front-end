import React from 'react'
//All COMMENTS WILL BE MOVED TO A DOCUMENT PAGE
// interface called SignInButtonProps that describes the expected props for the SignInButton component.
// Defined onSignIn as a function type that doesn't take any arguments and doesn't return any value (() => void).
interface SignInbuttonProps {
    onSignIn: () => void;
    // onClick: void;
}

// Explicitly set the type of the SignInButton component to be a React functional component (React.FC<SignInButtonProps>).
const SignInbutton: React.FC<SignInbuttonProps> = ({ onSignIn }) => {
  return (
    <button
    onClick={onSignIn}
    className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
    Sign In
    </button>
  )
}
export default SignInbutton