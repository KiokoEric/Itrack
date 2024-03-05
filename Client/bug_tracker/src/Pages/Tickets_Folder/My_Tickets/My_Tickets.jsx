import React, { useEffect, useState } from 'react';
import "./My_Tickets.css";
import Axios from "axios";
import Moment from 'react-moment';
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";

const My_Tickets = () => {

    const [Tickets, setTickets] = useState([])
    const [Date,setDate] = useState("")
    const [Cookie, setCookie] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    useEffect(() => {

        const FetchTickets = () => {
            Axios.get(`https://itrack-server-o39t.onrender.com/Issues/${userID}/Issues`, { 
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
                setDate(Response.data.Date)
            })
        } 
    
        if (userID) {
            FetchTickets()
        }
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
            Axios.post(`https://itrack-server-o39t.onrender.com/Issues/moveTicket/${ID}`, {
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
    <div className='MyTickets'> 
        <section>
            <h1>My Tickets</h1>
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
                <div className='MyTicketsDisplay' >
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
                                <td>{Ticket.Title}</td>
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
                                    <i  id='MyTicketEdit' class="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <i onClick={() => handleDelete(Ticket._id)} id='DeleteActions' class="fa-solid fa-trash"></i>
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

export default My_Tickets