import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useAuth();

  const userRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); // once auth is complete, this should be chagned to navigate to dashboard 

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    
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
      const roles = response?.data?.role;
      setAuth({ username, password, roles, accessToken });
      setSuccess(true);
      setUsername('');
      setPassword('');      
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

  return (
    <div className="flex flex-col justify-center items-center h-auth-sect bg-black text-banana">
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

          <button>Sign In</button>
        </form>
    </div>
  )
}

export default Login