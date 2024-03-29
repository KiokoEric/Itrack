import React from 'react';
import Axios from "axios";
import "../DeleteProfile/DeleteProfile.css"
import { useCookies } from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";

const DeleteProfile = () => {

    const [ Cookie, setCookie ] = useCookies(["auth_token"]); 
    const { id } = useParams()
    
    const navigate = useNavigate()

    const DeleteUser = () => {
        try{
            Axios.delete(`https://itrack-server-9s7w.onrender.com/Users/Delete/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                console.log(id)
                navigate("/Registration")
                window.localStorage.clear()
            })
        }
        catch (Error){
            console.log(Error)
        }
    }

return (
    <div className='DeleteProfile' >
        <section>
            <h1>We are sorry to see you go, but hope to see you again!</h1>
            <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Confirm Delete</button> 
        </section>
    </div>
)
}

export default DeleteProfile