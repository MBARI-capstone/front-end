import Statement from '../components/Statement'
import Navigation from '../components/Navigation'
import Link from 'next/link'
import {
  Database,
  Logout,
  Postcruise,
  Precruise,
  Reports,
} from '../components/Page'

export default function PageSelect() {
  // TODO: depends on user
  function List() {
    return (
      <div className="mt-16 grid space-y-4">
        <UserComponent />
        {/* {user.role === 'user' && <UserComponent />}
      {user.role === 'employee' && <EmployeeComponent />}
      {user.role === 'coordinator' && <CoordinatorComponent />}
      {user.role === 'admin' && <AdminComponent />} */}
      </div>
    )
  }
  function UserComponent() {
    return (
      <div>
        <Precruise />
        <Postcruise />
        {/* <button onClick="window.location.href='';">Add Dives</button> */}
        <Reports />
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
        <Reports />
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
        <Reports />
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
        <Reports />
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
