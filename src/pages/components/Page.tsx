import Link from "next/link";
import Button from "./button";
import LogOutButton from "./LogOutButton"; 


export const Precruise = () => {
  return (
    <Button hrefLink="/PreCruiseForm" buttonName="Pre Cruise"/>
  );
};

export const Postcruise = () => {
  return (
    <Button hrefLink="/PreCruiseSearch" buttonName="Post Cruise"/>
  );
};

export const DiveSearch = () => {
  return(
    <Button hrefLink="/DiveSearch" buttonName = "Add Dive"/>
  );
}

export const ReportsSearch = () => {
  return (
    <Button hrefLink="/ReportsSearch" buttonName="Reports Search"/>
  );
};

export const Database = () => {
  return (
    <Button hrefLink="" buttonName="Database"/>
  );
};



export const Logout = () => {
  return (
    <LogOutButton/>
  );
};
