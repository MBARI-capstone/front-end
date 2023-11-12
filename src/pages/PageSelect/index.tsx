import React, { useEffect } from 'react'
import Statement from '../components/Statement'
import Navigation from '../components/Navigation'

import { UserRoleType, userRoleAtom } from '../components/store'
import {
  Database,
  Logout,
  Postcruise,
  Precruise,
  ReportsSearch,
  DiveSearch,
} from '../components/Page'
import { fetchUserRole } from '../api/hooks/fetchUserRole'
import { GetServerSideProps } from 'next'

interface PageSelectProps {
  userRole: UserRoleType
}

export default function PageSelect({ userRole }: PageSelectProps) {
  console.log(userRole)
  // TODO: depends on user
  function List() {
    switch (userRole) {
      case UserRoleType.REGISTERED_USER:
        return <UserComponent />
      case UserRoleType.MBARI_EMPLOYEE:
        return <EmployeeComponent />
      case UserRoleType.LOGISTICS_COORDINATOR:
        return <CoordinatorComponent />
      case UserRoleType.ADMIN:
        return <AdminComponent />
      case null:
        console.log('UserRole is null')
        return null
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
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userRole = await fetchUserRole(context)
  console.log(userRole)
  return {
    props: {
      userRole,
    },
  }
}
