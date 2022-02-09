import React, { useRef, useState, useEffect } from 'react'

const Register = () => {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false); 
    const [useFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center h-auth-sect bg-black text-banana">
            <h1 className="uppercase">register</h1>
            <form className="flex flex-col">
                <label htmlFor="username">
                    Username: 
                </label>
                <input 
                    type="text" 
                    id="username" 
                    autocomplete="off" 
                    ref={userRef}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)} 
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
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)} 
                />
                <label htmlFor="confirm_password">
                    Password: 
                </label>
                <input 
                    type="password" 
                    id="confirm_password" 
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} 
                />
            </form>
        </div>
    )
}

export default Register