import React, { useEffect } from 'react';
import Axios from "axios";
import "../EditDetails/EditDetails.css";
import { useCookies } from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';

const EditDetails = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams()

    const navigate = useNavigate()

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {

        const FetchUser =() => {
        try{
            Axios.get(`https://itrack-server-o39t.onrender.com/Users/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }

        FetchUser()
        
    }, [])

    const EditUser = (e) => {
        e.preventDefault()

        const data = {
            Name, Email, Password
        }
        try {
            Axios.put(`https://itrack-server-o39t.onrender.com/Users/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setTimeout(() => {
                    setIsVisible(false);
                })
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <div className='MyProfile'>
        <section>
            <h1>Edit Profile</h1>
        </section>
        <section>
            <i id='User' class="fa-solid fa-user"></i>
            <form onSubmit={EditUser} method="post" encType="multipart/form-data">
                <div>
                    <label for=""><p>Name</p></label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} />
                </div>
                <div>
                    <label for=""><p>Email</p></label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
                </div>
                <div>
                    <label for=""><p>Password</p></label>
                    <article>
                        <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPasswords" placeholder="Enter Password..." value={Password} onChange={handlePassword}/>
                        {showPassword ? <i onClick={handleTogglePassword} id='Eyes' class="fa-solid fa-eye"></i> : <i id='Eyes' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                    </article>
                </div>
                <button onClick={EditUser} type="submit">Save Changes</button>
                <span id='Toast' className={`toast ${isVisible ? 'hide' : 'show'}`}>
                    <p onClose={handleCloseToast}>Successfully Logged in!</p>  
                </span>
            </form>
        </section> 
    </div>
)
}

export default EditDetails