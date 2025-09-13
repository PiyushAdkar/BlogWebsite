import '../LogIn/LogIn.css'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../Images/feather.png'
import Input from '../../Components/Input/Input.jsx'
import { login as storelogin } from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

const Login = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [Error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if (session)
            {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(storelogin(userData))
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div id='Container' style={{backgroundColor:"#111827", border:"1px solid #404750ff"}}>
            {Error && <p style={{color:"red", fontSize:"13px" , marginTop:"-60px", marginBottom:"30px"}}>{Error}</p>}
            <img src={Logo} style={{height:"65px", marginBottom:"-9px"}}/>
            <h2 id="heaading">Sign-In to your Account</h2>
            <p id='Signin'>Don't have any account?  <Link to='/SignUp'>Sign-Up Now</Link></p>
            <form id='form' onSubmit={handleSubmit(login)}>
                <Input label="Email" type="email" placeholder="abcd@gmail.com" {...register("email", {required:true})}/>
                <Input label='Password' type="password" placeholder="Password" {...register("password", {required:true})}/>
                <button type='submit' id='submit' >Sign-In</button>
            </form>
        </div>
    )
}

export default Login