import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet} from "react-router-dom"
import { useUserAuth } from "../hooks/userUserAuth"


const PublicRoute = () => {

    const {user} = useContext(UserContext)

    if (!user) {
        return <Outlet />
    }

    return user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
    
}

export default PublicRoute