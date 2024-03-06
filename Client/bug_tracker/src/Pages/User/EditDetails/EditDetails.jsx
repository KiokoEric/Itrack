import React, { useEffect } from 'react';
import Axios from "axios";
import "../EditDetails/EditDetails.css";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";
import { useParams} from "react-router-dom";
import { useState } from 'react';

const EditDetails = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams()

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
            Axios.get(`https://itrack-server-9s7w.onrender.com/Users/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
            enqueueSnackbar("Successfully Edited!" , { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right', 
                },
            }) 
        }
        catch (Error){
            console.log(Error)
            enqueueSnackbar("Edit Unsuccessful!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            }) 
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
            Axios.put(`https://itrack-server-9s7w.onrender.com/Users/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
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
            </form>
        </section> 
    </div>
)
}

export default EditDetails