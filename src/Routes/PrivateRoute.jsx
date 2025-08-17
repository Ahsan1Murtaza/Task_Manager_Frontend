import { Navigate, Outlet } from "react-router-dom"
import { useUserAuth } from "../hooks/userUserAuth"
import { UserContext } from "../context/userContext"
import { useContext } from "react"



const PrivateRoute = ({allowedRoles}) => {

  useUserAuth() // For authentication

  const { user } = useContext(UserContext)

  if (allowedRoles !== user?.role) {
    return <Navigate to='/' />
  }

  return (
    <Outlet />
  )
}

export default PrivateRoute