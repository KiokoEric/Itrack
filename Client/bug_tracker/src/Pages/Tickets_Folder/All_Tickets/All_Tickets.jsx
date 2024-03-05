import React, { useEffect, useState } from 'react';
import "../All_Tickets/All_Tickets.css";
import Axios from "axios";
import Moment from 'react-moment';
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Ticket = () => {

    const [Tickets, setTickets] = useState([])
    const [Projects, setProjects] = useState([])
    const [TicketID, setTicketID] = useState("")
    const [Cookie, setCookie] = useCookies(["auth_token"]); 

    // PRIORITY USESTATE

    const [ Open, setOpen ] = useState("")
    const [ Progress, setProgress ] = useState("")
    const [ HighPriority, setHighPriority ] = useState("")
    const [ CriticalPriority, setCriticalPriority ] = useState("")

    // Priority Category

    useEffect(() => {

        const FetchHighPriority = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/PriorityLength/High`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setHighPriority(Response.data.ArrayLength)
            })
        } 

        const FetchCriticalPriority = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/PriorityLength/Critical`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setCriticalPriority(Response.data.ArrayLength)
            })
        } 

        const FetchOpen = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/StatusLength/Open`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setOpen(Response.data.ArrayLength)
            })
        } 

        const FetchProgressStatus = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/StatusLength/In_Progress`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setProgress(Response.data.ArrayLength)
            })
        } 

        FetchHighPriority()

        FetchCriticalPriority()

        FetchOpen()

        FetchProgressStatus()

        },[])

    useEffect(() => {

         // Fetch Tickets

        const FetchTickets = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/AllIssues`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
                
            }) 
        } 

        // Fetch Projects

        const FetchProjects = async () => {
            await Axios.get(`https://itrack-server-o39t.onrender.com/Projects/AllProjects`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setProjects(Response.data)
            })
        }

        FetchProjects()
        FetchTickets()

        },[])

    const handleDelete= (_id) => {
        Axios.delete(`https://itrack-server-o39t.onrender.com/Issues/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(
            window.location.reload()
        )
    }

    const handleArchive= (ID) => {
        try {
            Axios.post(`https://itrack-server-o39t.onrender.com/Issues/moveTicket/${ID}`, ID ,  {
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
    <div className='AllTickets' > 
        <section>
            <h1>All Tickets</h1>
        </section>
        <section className='TicketSummary' >
            <div id='HighPriority' >
                <h1>High Priority Tickets</h1>
                <h2>{HighPriority}</h2>
            </div> 
            <div id='CriticalPriority' >
                <h1>Critical Priority Tickets</h1>
                <h2>{CriticalPriority}</h2>
            </div>  
            <div id='OpenTickets' > 
                <h1>Open Status Tickets</h1> 
                <h2>{Open}</h2>
            </div>  
            <div id='InProgressTickets' >
                <h1>In Progress Tickets</h1>
                <h2>{Progress}</h2>
            </div> 
        </section>
        <section>
            <table>
                <thead>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Ticket Title</th>
                    <th>Project Title</th>
                    <th>Ticket Type</th>
                    <th>Submitted By</th>
                    <th>Created</th>
                    <th>Actions</th>
                </thead>
                <div className='AllTicketsDisplay' >
                {
                    (Tickets.length > 0) ? 
                    Tickets.map((Ticket) => {
                    return(
                        <tbody>
                            <Link className='TicketLink' to={`/TicketDetails/${Ticket._id}`} >
                                <tr>
                                    <td><span className='PriorityDisplay' >{Ticket.Priority}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='StatusDisplay' >{Ticket.Status}</span></td>
                                </tr>
                                <tr>
                                    <td className='Title'>{Ticket.Title}</td>
                                </tr>
                                <tr>
                                    <td>{Ticket.Projects}</td>
                                </tr>
                                <tr>
                                    <td>{Ticket.Category}</td>
                                </tr>
                                <tr>
                                    <td>{Ticket.Submitted}</td>
                                </tr>
                                <tr>
                                    <td><Moment format="DD-MM-YYYY">{Ticket.Date}</Moment></td>
                                </tr>
                            </Link>
                            <tr>
                                <div> 
                                    <Link to={`/Ticket/${Ticket._id}`} key={Ticket._id} >
                                        <i  id='EditAction' class="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <i onClick={() => handleDelete(Ticket._id)} id='DeleteAction' class="fa-solid fa-trash"></i>
                                    <i onClick={() => handleArchive(Ticket._id)} class="fa-solid fa-box-archive" id='ArchiveIcon'  ></i> 
                                </div> 
                            </tr>
                        </tbody> 
                    )
                    }) : (<h2 className='NoTickets'>No Tickets Found.</h2> )
                }
                </div>
            </table>
        </section> 
    </div>
)
}

export default Ticket