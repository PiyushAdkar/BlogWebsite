import '../SignUp/SignUp.css'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../Images/feather.png'
import Input from '../../Components/Input/Input.jsx'
import { login as storelogin } from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

const SignUp = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [Error, setError] = useState("")

    const signUp = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data);
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
        <div id='Container'>
            {Error && <p style={{color:"red", fontSize:"13px" , marginTop:"-60px", marginBottom:"30px"}}>{Error}</p>}
            <img src={Logo} style={{height:"65px", marginBottom:"-9px"}}/>
            <h2 id="heaading">Sign-Up to create Account</h2>
            <p id='Signin'>Already have an account?  <Link to='/LogIn'>Sign-In Now</Link></p>
            <form id='form' onSubmit={handleSubmit(signUp)}>
                <Input label='Name' type="text" placeholder="Enter your name" {...register("name", {required:true})}/>
                <Input label="Email" type="email" placeholder="abcd@gmail.com" {...register("email", {required:true})}/>
                <Input label='Password' type="password" placeholder="Password" {...register("password", {required:true})}/>
                <button type='submit' id='submit' >Create Account</button>
            </form>
        </div>
    )
}

export default SignUp