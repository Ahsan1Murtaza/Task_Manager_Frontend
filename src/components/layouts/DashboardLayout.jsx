import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import SideMenu from "./SideMenu"
import Navbar from "./Navbar"


const DashboardLayout = ({children, activeMenu}) => {
    const {user} = useContext(UserContext)
  return (
    <div className="">
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className="flex">
                <div className="hidden min-[1024px]:block">
                    <SideMenu activeMenu={activeMenu}/>
                </div>

                <div className="grow mx-5">{children}</div>
            </div>
        )}

        
    </div>
  )
}

export default DashboardLayout