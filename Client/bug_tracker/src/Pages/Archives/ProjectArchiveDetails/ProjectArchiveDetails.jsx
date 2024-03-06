import React, { useEffect, useState } from 'react';
import LoadingGif from "../../../Images/LoadingGif.gif";
import "../ProjectArchiveDetails/ProjectArchiveDetails.css";
import Axios from "axios";
import Moment from 'react-moment';
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const ProjectArchiveDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Assigned, setAssigned] = useState([])
    const [Tickets, setTickets] = useState([])
    const [Projects, setProjects] = useState([])
    const [ProjectName, setProjectName] = useState("")
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`http://localhost:4000/ProjectArchives/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            setProjects(Response.data)
            setProjectName(Response.data.Title)
            setAssigned(Response.data.Assigned)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    },[]) 

    useEffect(() => {

        const FetchTickets = () => {
            Axios.get(`http://localhost:4000/Issues/Projects/${ProjectName}`, {
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

return (
    <div>
        {isLoading ? (
            <div className='Gif' >
                <img src={LoadingGif} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div className='ArchivedProjectSection' >
            <article className='ProjectDetails' >
                <figure>
                    <img src={Projects.Image} alt="" width="300px" height="300px" />
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
                    <p><b>Assigned Developers</b>: {Assigned.map((Item) => {
                        return(
                            <div>
                                <li>{Item[0].Name}</li>
                            </div>
                        )
                    })} </p>
                </figcaption>
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

export default ProjectArchiveDetails