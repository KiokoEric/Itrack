import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { AdministrationLogin } from "../../../Components/Hooks/Administrator";
import { useCookies } from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import "../Profile/Profile.css";

const Profile = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]); 
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Role, setRole] = useState("")
    const { id } = useParams()
    const [Success, setSuccess] = useState("")

    const Administrator = AdministrationLogin()
    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handleRole = (e) => {
        setRole(e.target.value)
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
                setRole(Data.data.Role)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }

        FetchUser()
        
    }, [])

    const Edit = () => {
        navigate(`/Edit/${id}`)
    } 

    const DeleteUser = () => {
        navigate(`/DeleteProfile/${id}`)
    }

return (
    <div className='Profile'>
        <section>
            <h1>Profile</h1>
        </section>
        <section>
            <i id='User' class="fa-solid fa-user"></i>
            <form encType="multipart/form-data">
                <div>
                    <label for=""><p>Name</p></label>
                    <input type="text" name="Name" id="Name" value={Name}  onChange={handleName} readOnly />
                </div>
                <div>
                    <label for=""><p>Email</p></label>
                    <input type="email" name="Email" id="Email" value={Email} onChange={handleEmail} readOnly />
                </div>
                <div>
                    <label for=""><p>Assigned Role</p></label>
                    <input type="text" name="text" id="Role"  value={Role} onChange={handleRole} readOnly />
                </div>
                <h4 className='Success'>{Success}</h4>
                <div>
                    {
                        Administrator ? <button onClick={Edit} type="submit"><i class="fa-solid fa-pen-to-square"></i>Edit Details</button> : null
                    }
                    {
                        Administrator ? <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Delete Profile</button> : null
                    }
                </div>
            </form>
        </section> 
    </div>
)
}

export default Profile