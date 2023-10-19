import Link from "next/link";
import Button from "./button";

export const Precruise = () => {
  return (
    <Button hrefLink="/PreCruiseForm" buttonName="Pre Cruise"/>
  );
};

export const Postcruise = () => {
  return (
    <Button hrefLink="/PostCruiseForm" buttonName="Post Cruise"/>
  );
};

export const Reports = () => {
  return (
    <Button hrefLink="" buttonName="Reports Search"/>
  );
};

export const Database = () => {
  return (
    <Button hrefLink="" buttonName="Database"/>
  );
};

export const Logout = () => {
  return (
    <Button hrefLink="/" buttonName="Logout"/>
  );
};
