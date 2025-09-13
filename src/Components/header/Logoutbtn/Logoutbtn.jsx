import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import authService from "../../../appwrite/auth"
import { logout } from "../../../store/authSlice"

const LogOut = ()=> 
{
   
    const dispatch = useDispatch()
    const HandleLogout = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
   
    return <NavLink className='nav-link' to='/'><button onClick={HandleLogout}>Log-Out</button></NavLink>
}

export default LogOut