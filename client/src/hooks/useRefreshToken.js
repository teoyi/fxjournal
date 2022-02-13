import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth(); 
    // console.log(auth);
    
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true 
        });
        console.log(response);
        setAuth(prev => {
            console.log('right here in retoken ');
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { 
                ...prev,
                username: response.data.username,
                roles: response.data.roles, 
                accessToken: response.data.accessToken 
            }
        });
        console.log(auth);
        return response.data.accessToken; 
    };

    return refresh;
};

export default useRefreshToken;