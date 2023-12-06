import React from 'react';

interface ButtonProps {
    hrefLink: string;
    buttonName: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ hrefLink, buttonName }) => {
    return (
      <a
        href={hrefLink}
        className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {buttonName}
      </a>
    );
  };
  
  export default Button;