import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "../Project_Details/Project_Details.css";
import ProjectImage from "../../../Images/ProjectImage.png";
import Moment from 'react-moment';
import LoadingGif from "../../../Images/LoadingGif.gif";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';


const Project_Details = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [Tickets, setTickets] = useState([])
    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [Projects, setProjects] = useState([])
    const [ProjectName, setProjectName] = useState("")
    const [Assigned, setAssigned] = useState([])
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`https://itrack-server-9s7w.onrender.com/Projects/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            setProjects(Response.data)
            setAssigned(Response.data.Assigned)
            setProjectName(Response.data.Title)
        }) 
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    },[]) 

    useEffect(() => {

        const FetchTickets = () => { 
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/Projects/${ProjectName}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
            })
        } 
    
        if (ProjectName) {
            FetchTickets()
        }
        },[ProjectName])

    const handleDelete= (_id) => {
        Axios.delete(`https://itrack-server-9s7w.onrender.com/Issues/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(
            window.location.reload()
        )
    } 

return (
    <div>
        {isLoading ? (
            <div className='Gif' >
                <img src={LoadingGif} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div>
            <article >
            <div key={Projects._id} className='MoreInformation' >
                <figure>
                    {Projects.Image ? (<img src={Projects.Image} alt="" width="500px" />) : (<img src={ProjectImage} alt="" width="400px" />) }
                </figure>
                <figcaption>
                    <h1>{Projects.Title}</h1>
                    <p>{Projects.Description}</p>
                    <h3>Priority Level</h3>
                    <p>{Projects.Priority}</p>
                    <h3>Timeline</h3>
                    <div>
                        <p><b>Start Date</b>: {Projects.StartDate}</p>
                        <p><b>End Date</b>: {Projects.EndDate}</p>
                    </div>
                    <p><b>Project Manager</b>: {Projects.Manager}</p>
                    <p><b>Assigned Developers:</b> {Assigned.map((Item) => {
                        return(
                            <div>
                                <li>{Item[0].Name}</li>
                            </div>
                        )
                    })}</p> 
                    <div>
                        <Link className='Edit' to={`/Project/${Projects._id}`} key={Projects._id} >
                            <i class="fa-solid fa-pen-to-square"></i> Edit Details
                        </Link>
                    </div>
                </figcaption>
            </div>
        </article>
        <article className='ProjectTickets' >
            <table>
                <thead>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Ticket Title</th>
                    <th>Project Title</th>
                    <th>Ticket Type</th>
                    <th>Submitted By</th>
                    <th>Date</th>
                    <th>Actions</th>
                </thead>
                { 
                (Tickets.length > 0) ? 
                Tickets.map((Ticket) => { 
                    return (
                    <tbody>
                        < Link className='TicketLink' to={`/TicketDetails/${Ticket._id}`} >
                            <td><span className='PriorityDisplay' >{Ticket.Priority}</span></td>
                            <td><span className='StatusDisplay' >{Ticket.Status}</span></td>
                            <td>{Ticket.Title}</td>
                            <td>{Ticket.Projects}</td>
                            <td>{Ticket.Category}</td>
                            <td>{Ticket.Submitted}</td>
                            <td><Moment format="DD-MM-YYYY">{Ticket.Date}</Moment></td>
                        </Link> 
                        <td> 
                            <div>
                                <Link to={`/Ticket/${Tickets._id}`} key={Ticket._id} >
                                    <i  id='EditAction' class="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <i onClick={() => handleDelete(Ticket._id)} id='DeleteAction' class="fa-solid fa-trash"></i>
                            </div>
                        </td> 
                    </tbody>
                    )
                }) : (
                    <h2 className='NoTickets'>No Tickets Found.</h2> 
                )
                }
            </table>
        </article>
        </div>
            )
        }
    </div>
    
)
}

export default Project_Details