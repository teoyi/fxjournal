import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LOGIN_URL = '/auth';
const ALL_JOURNAL_URL = 'journals/all';

const Login = () => {
  const [cookies, setCookie] = useCookies(['currentJournal']);
  const { setAuth, persist, setPersist } = useAuth();
  const axiosPrivate = useAxiosPrivate();

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

      const journalResponse = await axiosPrivate.post(
        ALL_JOURNAL_URL,
        JSON.stringify({ username }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      setCookie('currentJournal', journalResponse.data[0]._id, { path: '/' });
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
      <div className={bgImg === 'two' ? two : bgImg === 'three' ? three : bgImg === 'four' ? four : one}></div>
      <div className="w-2/3 flex flex-col justify-center items-center h-full z-10">
        <h1 className="font-goshbe lg:text-auth-lg xl:text-auth-xl -mt-6r lg:leading-auth-lg xl:leading-auth-xl">fxjournal</h1>
        <p className="font-semibold text-xl">Your one stop shop to review your trades</p>
      </div>
      <div className="flex flex-col h-full w-1/3 justify-center items-center rounded-l-3xl bg-black z-10">
        <p className={errMsg ? "block" : "hidden"}>{errMsg}</p>
        <h1 className='uppercase font-semibold text-3xl mb-5'>Sign In</h1>
        <form className="flex flex-col  w-[20vw]" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            className='bg-transparent border-b-2 border-banana focus:outline-0 mb-5'
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
            className='bg-transparent border-b-2 border-banana focus:outline-0 mb-5'
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
          <div className='mb-5'>
            Don't have an account? <Link className="decoration-solid underline" to="/register">Register</Link>
          </div>
          <button className='bg-banana text-black px-10 py-2 rounded-full'>Sign In</button>
        </form>
      </div>

    </div>
  )
}

export default Login