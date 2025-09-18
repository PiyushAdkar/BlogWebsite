import '../footer/footer.css'
import logo from '../../Images/feather.png'
import {NavLink} from 'react-router-dom'
const Footer = ()=> {
    return (
        <div id='footer'>
            <div id='logo'>
                <img src={logo} style={{height:"70px"}}/>
                <span>MyBlog</span>
            </div>
            <div className='ax'>
                <span>Company</span>
                <br/>
                <NavLink>Features</NavLink>
                <NavLink>Pricing</NavLink>
                <NavLink>Affiliate Program</NavLink>
                <NavLink>Press Kit</NavLink>
            </div>
            <div className='ax'>
                <span>Support</span>
                <br/>
                <NavLink>Account</NavLink>
                <NavLink>Help</NavLink>
                <NavLink>Contact Us</NavLink>
                <NavLink>Customer Support</NavLink>
            </div>
             <div className='ax'>
                <span>Legals</span>
                <br/>
                <NavLink>Terms and Conditions</NavLink>
                <NavLink>Privacy Policy</NavLink>
                <NavLink>Licensing</NavLink>
                <br/>
            </div>
        </div>
    )
}

export default Footer