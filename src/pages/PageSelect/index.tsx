import React, { useState, useEffect, useContext } from 'react';
import Statement from '../components/Statement'
import Navigation from '../components/Navigation'

import { userRoleAtom } from '../components/store';
import {
  Database,
  Logout,
  Postcruise,
  Precruise,
  ReportsSearch,
  DiveSearch,
} from '../components/Page'
import { useAtomValue } from 'jotai/react';

type UserRoleType = 'user' | 'employee' | 'coordinator' | 'admin' | null;



export default function PageSelect() {
  const userRole = useAtomValue(userRoleAtom) as UserRoleType;
  console.log(userRole)
  // TODO: depends on user
  function List() {
    switch (userRole) {
      case 'user':
        return <UserComponent />;
      case 'employee':
        return <EmployeeComponent />;
      case 'coordinator':
        return <CoordinatorComponent />;
      case 'admin':
        return <AdminComponent />;
        case null:
          console.log("UserRole is null");
          return null;
      default:
        //Need JWT cookies to have this work
        // return <div>Access Denied</div>; // Or redirect to a login page
        return <UserComponent />
    }
  }
  
  function UserComponent() {
    return (
      
      <div className="flex flex-col items-center space-y-4">
        <Precruise />
        <Postcruise />
        <DiveSearch />
        {/* <button onClick="window.location.href='';">Add Dives</button> */}
        <ReportsSearch />
        <Logout />
      </div>
    )
  }

  {
    /* for MBARI employees */
  }
  function EmployeeComponent() {
    return (
      <div>
        {/* <button onClick="window.location.href='';">Add Dives</button */}
        <ReportsSearch />
        <Logout />
      </div>
    )
  }

  {
    /* for logistics coordinator */
  }
  function CoordinatorComponent() {
    return (
      <div>
        <Precruise />
        <Postcruise />
        {/* <button onClick="window.location.href='';">Add Dives</button> */}
        <ReportsSearch />
        <Logout />
      </div>
    )
  }

  {
    /* for database admin */
  }
  function AdminComponent() {
    return (
      <div>
        <Precruise />
        <Postcruise />
        {/* <button onClick="window.location.href='';">Add Dives</button> */}
        <ReportsSearch />
        <Database />
        <Logout />
      </div>
    )
  }
  return (
    <Navigation>
      <List />
      <Statement />
    </Navigation>
  );
}


