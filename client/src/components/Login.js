import { useEffect } from 'react';
import '../App.css';
import {getStoredToken} from '../utils/verifyToken';


function Login() {
    useEffect(() => {
        let code = new URLSearchParams(window.location.search).get('code')
        let token = getStoredToken(false);
        if(!token){
            if(code){
                getToken(code)
            }else{
                fetchAuth();
            }
        }else{
            window.location.href = "/"
        }
        
    })

    const getToken = async (code) => {
        let url = "/oauth/authorize?code=" + code
        const data = await fetch(url);
        const json_data = await data.json();
        localStorage.setItem('token',JSON.stringify(json_data.token))
        window.location.href = "/"
    }

    const fetchAuth = async () => {
        const data = await fetch("/users/info");
        const json_data = await data.json();
        if(json_data.authUrl){
            window.location.href = json_data.authUrl;
        } 
    }

    return (
        <div className="App">
            <h1>Login</h1>
        </div>
    );
}

export default Login;
