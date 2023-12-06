import React from 'react';

interface ButtonProps {
    hrefLink: string;
    buttonName: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ hrefLink, buttonName }) => {
    return (
      <a
        href={hrefLink}
        className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {buttonName}
      </a>
    );
  };
  
  export default Button;