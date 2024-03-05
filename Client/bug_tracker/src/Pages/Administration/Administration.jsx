import React, { useEffect, useState } from 'react';
import "../Administration/Administration.css";
import Axios from "axios";
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";

const Administration = () => {

    const [Users, setUsers] = useState([])
    const [Cookie, setCookie] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    useEffect(() => {

        const FetchUsers = () => { 
            Axios.get(`https://itrack-server-o39t.onrender.com/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])

return (
    <div className='Administration' >
        <section>
            <h1>Administration Dashboard</h1>
        </section>
        <section>
            <table>
                <thead>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                </thead>
                <div className='AdministrationDisplay' >
                    {
                    Users.map((User) => {
                    return(
                        <Link className='AdminUsers' to={`/Profile/${User._id}`} >
                            <tbody>
                                <td><i class="fa-solid fa-user"></i></td>
                                <td>{User.Name}</td>
                                <td>{User.Email}</td>
                                <td>{User.Role}</td>
                            </tbody>
                        </Link>
                    )
                    })
                    }
                </div>
            </table>
        </section>
    </div>
)
}

export default Administration