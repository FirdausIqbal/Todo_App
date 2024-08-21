import React, {useEffect, useState} from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import API_URL from './api_url';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route
} from "react-router-dom"


function App() {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : {}
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const logoutHandle = async()=>{
    try {
      await axios.post(`${API_URL}auth/logout`, {}, { withCredentials: true});
      localStorage.removeItem("user")
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    const cekAuth = async()=>{
      try {
        const res = await axios.get(`${API_URL}auth/cekauth`, { withCredentials: true })
        if(Object.keys(user).length > 1 && !res.data.isAuthenticated){
          logoutHandle()
        } else {
          setIsAuthenticated(res.data.isAuthenticated)
          localStorage.setItem('user', JSON.stringify(user));
        }
      } catch (error) {
          console.log(error.message)
      }
    }
    cekAuth();
    const intervalId = setInterval(() => {
      cekAuth()
    }, 10 * 60 * 1000);
    return ()=> clearInterval(intervalId)
  }, [user])
  return (
      <Router>
        <Routes>
          <Route index element={isAuthenticated ? <Home data={user}/> : <Navigate to={"/login"}/> } />
          <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login isAuth={setUser}/>} />
          <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register isAuth={setUser} />} />
        </Routes>
      </Router>
  );
}

export default App;