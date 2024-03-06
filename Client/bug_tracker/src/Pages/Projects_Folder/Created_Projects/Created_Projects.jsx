import React, { useEffect, useState } from 'react';
import LoadingGif from "../../../Images/LoadingGif.gif";
import ProjectImage from "../../../Images/ProjectImage.png";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { Link  } from 'react-router-dom';
import "./Created_Projects.css";
import Axios from "axios";

const Created_Projects = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Projects, setProjects] = useState([])

    const userID = useGetUserID();

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchProjects = async () => {
        await Axios.get(`http://localhost:4000/Projects/AllProjects`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            setProjects(Response.data)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

    fetchProjects()

    },[])

    // Delete Project

    const handleDelete= (id) => {
        Axios.delete(`http://localhost:4000/Projects/${id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }

    // Archive Project

    const handleArchive= (ID) => {

        try {
            Axios.post(`http://localhost:4000/Projects/moveProject/${ID}`, {
                headers: { authorization: Cookie.auth_token }, 
            }) 
            .then(() => { 
                window.location.reload()
            })
        } catch (error) { 
            console.error(error) 
        }
    }

return (
    <div>
        {isLoading ? (
            <div className='Gif' >
                <img src={LoadingGif} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div className='Projects'>
            <section>
                <h1>All Projects</h1> 
            </section>
            <section>
                {
                (Projects.length > 0) ?  
                Projects.map((Project) => { 
                return (
                <div key={Project._id} >
                    <figure className='Information' >
                        <Link to={`/ProjectDetails/${Project._id}`} className='MyLink' >  
                            {Project.Image ? (<img src={Project.Image} alt="" />) : (<img src={ProjectImage} alt="" />) }
                            <figcaption  >
                                <h2>{Project.Title}</h2>
                            </figcaption>
                        </Link>
                        <div>
                            <Link to={`/Project/${Project._id}`} key={Project._id} >
                                <i id='CreatedProjectsEdit' class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <i id='Delete' onClick={() => handleDelete(Project._id)} class="fa-solid fa-trash"></i>
                            <i onClick={() => handleArchive(Project._id)} class="fa-solid fa-box-archive" id='ArchiveProject'></i> 
                        </div>
                    </figure> 
                </div>
                )
                }) : <h2 className='Failure'>No Projects Found.</h2> 
                }
            </section>
            </div>
            )
        }
    </div>
    
)
}

export default Created_Projects