import React, { useEffect, useState } from 'react';
import LoadingGif from "../../../Images/LoadingGif.gif";
import "../ProjectArchives/ProjectArchives.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { Link  } from 'react-router-dom';

const ProjectArchives = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [Projects, setProjects] = useState([])

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchProjects = async () => {
        await Axios.get(`https://itrack-server-9s7w.onrender.com/ProjectArchives/Archives`, {
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
        Axios.delete(`https://itrack-server-9s7w.onrender.com/ProjectArchives/${id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }

    const handleArchive = (ID) => {
        try {
            Axios.post(`https://itrack-server-9s7w.onrender.com/ProjectArchives/moveProject/${ID}`,  {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(
                window.location.reload()
            )
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
            <div className='ProjectArchive' > 
            <section>
                <h1>Archived Projects</h1> 
            </section>
            <section>
                {
                (Projects.length > 0) ?  
                Projects.map((Project) => { 
                return (
                <div key={Project._id} >
                    <figure className='Information' >
                        <Link to={`/ProjectDetailsArchives/${Project._id}`} className='MyLink'  > 
                            <img src={Project.Image} alt="" />
                            <figcaption  >
                                <h2>{Project.Title}</h2>
                            </figcaption>
                        </Link>
                        <div>
                            <i id='DeleteDetails' onClick={() => handleDelete(Project._id)} class="fa-solid fa-trash"></i>
                            <i class="fa-solid fa-arrow-rotate-left" onClick={() => handleArchive(Project._id)} id='RestoreProject' ></i>
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

export default ProjectArchives