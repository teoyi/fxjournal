import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  // console.log(from);

  const userRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  

  // bg image 
  const one = "w-4/5 absolute bg-bw1-image bg-cover blur-sm h-full z-0"
  const two = "w-4/5 absolute bg-bw2-image bg-cover blur-sm h-full z-0"
  const three = "w-4/5 absolute bg-bw3-image bg-cover blur-sm h-full z-0"
  const four = "w-4/5 absolute bg-bw4-image bg-cover blur-sm h-full z-0"
  const [bgImg, setBgImg] = useState('one');

  useEffect(() => {
    userRef.current.focus();
    const randomNum = Math.floor(Math.random() * 4) + 1;
    if (randomNum === 2) {
      setBgImg('two');
    } else if (randomNum === 3) {
      setBgImg('three');
    } else if (randomNum === 4) {
      setBgImg('four');
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });
      setUsername('');
      setPassword('');  
      navigate(from, { replace: true });
    } catch (error) {
        if (!error?.response) {
          setErrMsg('No Server Response');
        } else if (error.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (error.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return (
    <div className="flex flex-row justify-start items-center h-screen bg-black  text-banana">
      <div className={bgImg === 'two' ? two : bgImg === 'three' ? three : bgImg === 'four' ? four : one }></div>
      <div className="w-4/5 flex flex-col justify-center items-center h-full z-10">
        <h1 className="font-goshbe text-auth-lg -mt-6r leading-auth-lh">fxjournal</h1>
        <p className="font-semibold text-xl">Your one stop shop to review your trades</p>
      </div>
      <div className="flex flex-col h-full w-1/5 justify-center items-center bg-black z-10">
        <p className={errMsg ? "block" : "hidden"}>{errMsg}</p>
        <h1>Sign In</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}> 
          <label htmlFor="username">
            Username:
          </label>
          <input 
            type="text" 
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required 
          />

          <label htmlFor="password">
            Password:
          </label>
          <input 
            type="password" 
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required 
          />
          <div className="">
            <input 
              type="checkbox" 
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor='persist'>Trust this device</label>
          </div>
          <div> 
            Don't have an account? <Link className="decoration-solid underline" to="/register">Register</Link>
          </div>
          <button>Sign In</button>
        </form>
      </div>
        
    </div>
  )
}

export default Login