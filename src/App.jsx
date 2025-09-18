import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import authService from './appwrite/auth'
import {useDispatch, useSelector} from 'react-redux'
import { login, logout } from './store/authSlice';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Loading from './Pages/Loading/Loading';
import Login from './Pages/LogIn/Login';
import SignUp from './Pages/SignUp/Signup'
import { useLocation } from 'react-router-dom'
import AddPost from "../src/Components/Post-form/PostForm"
import AllPosts from './Pages/AllPosts/Allposts'
import PostSubmit from './Pages/PostSubmit/PostSubmit'
import Protected from './Components/Protect/Protected'

function App() {
  const authStatus = useSelector((state)=>state.auth.status);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  function ScrollToTop() 
  {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [pathname]);

  return null;
  }

  const checkAuth = async() =>{
    try{
      const userData = await authService.getCurrentUser();
      if(userData) dispatch(login({userData}));
      else dispatch(logout());
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    checkAuth()
  },[authStatus])

  if(loading)
  {
    return <Loading/>;
  }
  else
  {
    return(
        <div id='container'>
          <Header/>
          <main id='content'>
            <ScrollToTop/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/LogIn" element={<Protected authentication={false}><Login /></Protected>} />
                <Route path="/SignUp" element={<Protected authentication={false}><SignUp /></Protected>} />
                <Route path="/AddPost" element={<Protected authentication={true}><AddPost /></Protected>} />
                <Route path="/AllPosts" element={<Protected authentication={true}><AllPosts /></Protected>} />
                <Route path="/Post/:id" element={<Protected authentication={true}><PostSubmit /></Protected>} />
              </Routes>
          </main>
          <Footer/>
        </div>
    )
  }
}

export default App
