import { ReactNode } from "react"
import { useSelector } from "react-redux"
// import useAuth from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"


type props = {
    children: ReactNode
}


const RestrictedPublicRoute = ({ children }: props) => {
    const { user } = useSelector((select: any) => select.user)
    return (
        <>
            {user ? <><Navigate to='/' /></> : <>{children}</>}
        </>
    )
}

export default RestrictedPublicRoute