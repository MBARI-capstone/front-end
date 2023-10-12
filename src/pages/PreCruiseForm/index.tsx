import React from "react";
import Image from "next/image";
import { Fragment, useState } from "react";

import Navbar from "../components/Navbar";

const preCruiseForm = () => {
  return (
    <div>
      <Navbar currentPage="precruise" />
    </div>
  );
};

export default preCruiseForm;
