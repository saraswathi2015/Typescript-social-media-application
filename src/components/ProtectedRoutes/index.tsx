import *  as React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'

interface IProtectedRoutesProps{

}

const ProtectedRoutes:React.FC<IProtectedRoutesProps> = (props)=>{
   
    const isAuth:boolean = false
    const location = useLocation()

    return isAuth ? (<Outlet />) : (
        <Navigate to="/login" state={{from:location}} />
    )
}

export default ProtectedRoutes
