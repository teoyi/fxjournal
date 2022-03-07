import React, { useRef, useState, useEffect } from 'react'
import axios from "../api/axios";
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // bg image 
    const one = "w-4/5 absolute bg-bw1-image bg-cover blur-sm h-full z-0"
    const two = "w-4/5 absolute bg-bw2-image bg-cover blur-sm h-full z-0"
    const three = "w-4/5 absolute bg-bw3-image bg-cover blur-sm h-full z-0"
    const four = "w-4/5 absolute bg-bw4-image bg-cover blur-sm h-full z-0"
    const [bgImg, setBgImg] = useState('one');

    useEffect(() => {
        userRef.current.focus(); // on load focus on the username field right away 
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
        setValidName(USER_REGEX.test(username)); // on change of username field, set and test with regex 
    }, [username]);

    useEffect(() => {
        // on change of both password field, set adn test for truthy or falsey value 
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // to counter button being enabled through JS 
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        };

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response));
            setSuccess(true);

            // on success, remove inputs and error message
            setUsername('');
            setPassword('');
            setMatchPassword('');
            setErrMsg('');
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            };
        };
    };

    return (
        <div className="flex flex-row justify-start items-center h-screen bg-black  text-banana">
            <div className={bgImg === 'two' ? two : bgImg === 'three' ? three : bgImg === 'four' ? four : one}></div>
            <div className="w-2/3 flex flex-col justify-center items-center h-full z-10">
                <h1 className="font-goshbe lg:text-auth-lg xl:text-auth-xl -mt-6r lg:leading-auth-lg xl:leading-auth-xl">fxjournal</h1>
                <p className="font-semibold text-xl">Your one stop shop to review your trades</p>
            </div>
            <div className="flex flex-col h-full w-1/3 justify-center items-center rounded-l-3xl bg-black z-10">
                <p>{errMsg}</p>
                <h1 className="uppercase font-semibold text-3xl mb-5">register</h1>
                <form className="flex flex-col w-[20vw]" onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setUsername(e.target.value)}
                        className='bg-transparent border-b-2 border-banana focus:outline-0 mb-5'
                        value={username}
                        required
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    {/* <p className={userFocus && username && !validName ? "block text-xs" : "hidden"}>
                        min. 4 characters, beginning with a letter <br />
                        Letters, numbers, underscores, and hyphens are allowed.
                    </p> */}

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`bg-transparent border-b-2 border-banana focus:outline-0 ${passwordFocus && !validPassword ? "mb-0" : "mb-5"}`}
                        value={password}
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p className={passwordFocus && !validPassword ? "block text-xs mb-5" : "hidden"}>
                        min. 8 characters<br />
                        Must include upper and lowercase letters, a number and a special character.
                    </p>

                    <label htmlFor="confirm_password">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        className={`bg-transparent border-b-2 border-banana focus:outline-0 ${matchFocus && !validMatch ? "mb-0" : "mb-5"}`}
                        value={matchPassword}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p className={matchFocus && !validMatch ? "block text-xs mb-5" : "hidden"}>
                        Passwords do not match
                    </p>
                    <div className='mb-5'>
                        Already have an account? <Link className="decoration-solid underline" to="/login">Login</Link>
                    </div>
                    <button className='bg-banana text-black px-10 py-2 rounded-full' disabled={!validName || !validPassword || !validMatch ? true : false}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Register