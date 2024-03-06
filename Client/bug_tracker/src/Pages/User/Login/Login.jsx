import React from 'react';
import Axios from "axios";
import { useState } from 'react';
import {useCookies} from "react-cookie";
import { useSnackbar } from 'notistack';
import "../Login/Login.css";

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email, Password
        }
        try {
            const response = await Axios.post("https://itrack-server-o39t.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                }) 
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"})
            console.log(error)
        }
    }

    const DemoLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email : "kiokoerick040@gmail.com" , Password : "Victory2024"
        }
        try {
            const response = await Axios.post("https://itrack-server-o39t.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                }) 
        } catch (error) { 
            console.log(error) 
        }
    }

    const AdministratorLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email : "abeldamina@gmail.com" , Password : "Triumph2024"
        }
        try {
            const response = await Axios.post("https://itrack-server-o39t.onrender.com/Users/Administrator", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                    }) 
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"})
            console.log(error)
        }
    }

return (
    <div className='Login' > 
    <section>
        <h1>Login</h1>
    </section>
    <section>
        <form onSubmit={onLogin} method="post" encType="multipart/form-data">
            <div>
                <label for=""><p>Email</p></label>
                <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
            </div>
            <div>
                <label for=""><p>Password</p></label>
                <article>
                    <input  type={showPassword ? 'text' : 'password'} name="Password" id="LoginPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword}/>
                    {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                </article>
            </div>
            <div className='LoginButton'>
                <button onClick={onLogin} type="submit">Login</button>
                <button onClick={DemoLogin}>Demo Login</button>
                <button onClick={AdministratorLogin} >Administrator Login</button>
            </div>
        </form>
    </section>
    </div>
)
}

export default Login 