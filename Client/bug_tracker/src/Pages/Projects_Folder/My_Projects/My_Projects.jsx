import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { Link  } from 'react-router-dom';
import ProjectImage from "../../../Images/ProjectImage.png";
import "../My_Projects/My_Projects.css";
import Axios from "axios";

const My_Projects = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Projects, setProjects] = useState([])

    const userID = useGetUserID();

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchProjects = async () => {
        await Axios.get(`https://itrack-server-o39t.onrender.com/Projects//${userID}/Project`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            setProjects(Response.data)
        })
    }

    },[userID])

    // Delete Project

    const handleDelete= (_id) => {
        Axios.delete(`https://itrack-server-o39t.onrender.com/Projects/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
    }

return (
    <div className='MyProjects' >
        <section>
            <h1>My Projects</h1>
        </section>
        <section>
            {
            (Projects.length > 0) ?  
            Projects.map((Project) => { 
            return (
            <div key={Project._id} >
                <Link to={`/ProjectDetails/${Project._id}`}  className='Information'> 
                    <figure>
                    {Project.Image ? (<img src={Project.Image} alt=""/> ) : (<img src={ProjectImage} alt="" />) }
                        <figcaption  >
                            <h2>{Project.Title}</h2>
                            <p>{Project.Description}</p> 
                            <br />
                        </figcaption>
                        <div>
                            <Link to={`/Project/${Project._id}`} key={Project._id} >
                                <i id='MyEdit' class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <i id='Delete' onClick={() => handleDelete(Project._id)} class="fa-solid fa-trash"></i>
                        </div>
                    </figure>
                </Link>
            </div>
            )
            }) : <h2 className='Failure'>No Projects Found.</h2> 
            }
        </section>
    </div>
)
}

export default My_Projects