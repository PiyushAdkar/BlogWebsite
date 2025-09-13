import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Pages/Loading/Loading'

export default function Protected({children, authentication = true})
{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication)
        {
            navigate("/LogIn")
        }
        else if(!authentication && authStatus !== authentication)
        {
            navigate("/")
        }
        setLoading(false)
    },[authStatus, navigate, authentication])

    return (
        loading ? <Loading/> : <>{children}</>
    )
}