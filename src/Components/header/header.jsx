import '../header/header.css'
import Logo from '../../Images/feather.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogOut from './Logoutbtn/Logoutbtn'


const Header = ()=> {
    const authStatus = useSelector((state)=>state.auth.status);
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const navItems = [
        {
            name:"Home",
            path:"/",
            active: true
        },
        {
            name:"LogIn",
            path:"/LogIn",
            active: !authStatus
        },
        {
            name:"Sign-Up",
            path:"/SignUp",
            active: !authStatus
        },
        {
            name:"All Posts",
            path:"/AllPosts",
            active: authStatus
        },
        {
            name:"Add Post",
            path:"/AddPost",
            active: authStatus
        }
    ]

    const handleLogoClick = ()=> {
        navigate('/')
    }

    return (
        <header id='header'>
            <div id='Logo' onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                <img src={Logo} style={{height:"28px"}}></img>
                <span>MyBlog</span>
                {userData?<p id="userName">{userData.name}</p>:null }
            </div>
            <nav>
                <ul className="nav-list">
                {navItems.map((item, index) =>
                    item.active ? (
                    <li key={index}>
                        <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "nav-link")}>
                        <button>{item.name}</button>
                        </NavLink>
                    </li>
                    ) : null
                )}
                {authStatus? <LogOut/>:null}
                </ul>
            </nav>
        </header>
    )
}

export default Header