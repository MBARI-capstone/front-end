import React, { useState, useEffect } from 'react';
import Statement from '../components/Statement'
import Navigation from '../components/Navigation'
import Link from 'next/link'
import {
  Database,
  Logout,
  Postcruise,
  Precruise,
  ReportsSearch,
  DiveSearch,
} from '../components/Page'


export default function PageSelect({ userRole }) {
 


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

export async function getServerSideProps(context) {
  // Fetch data from external API
  // Replace '/api/user-role' with your actual API endpoint that requires authentication
  const response = await fetch(`${process.env.API_URL}/api/user-role`, {
    headers: {
      // Include any necessary headers, like authentication tokens
      'Authorization': `Bearer ${context.req.cookies.token}`,
    },
  });
  const data = await response.json();

  // Pass user role to the page via props
  return { props: { userRole: data.role } };
}
