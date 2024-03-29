import React, { useState } from 'react';
import "../TicketArchives/TicketArchives.css";
import Axios from "axios";
import Moment from 'react-moment';
import LoadingGif from "../../../Images/LoadingGif.gif";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useEffect } from 'react';

const TicketArchives = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [Archives, setArchives] = useState([]) 
    const [Cookie, setCookie] = useCookies(["auth_token"]);  

    useEffect(() => {

        try{
            Axios.get(`https://itrack-server-9s7w.onrender.com/TicketArchives/Archives`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setArchives(Response.data)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error) 
        }
        
    }, [])

    const handleDelete= (_id) => {
        Axios.delete(`https://itrack-server-9s7w.onrender.com/TicketArchives/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(
            window.location.reload()
        )
    }

    const handleArchive = (ID) => {
        try {
            Axios.post(`https://itrack-server-9s7w.onrender.com/TicketArchives/moveTicket/${ID}`,  {
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
            <div className='Archives'>
            <section>
                <h1>Archived Tickets</h1>
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
                    {
                    (Archives.length > 0) ? 
                    Archives.map((Archive) => {
                        return( 
                        <tbody>
                            <Link className='TicketLink' to={`/TicketDetailsArchives/${Archive._id}`} >
                                <tr>
                                    <td><span className='PriorityDisplay' >{Archive.Priority}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='StatusDisplay' >{Archive.Status}</span> </td>
                                </tr>
                                <tr>    
                                    <td>{Archive.Title}</td>
                                </tr>
                                <tr>
                                    <td>{Archive.Projects}</td>
                                </tr>
                                <tr>
                                    <td>{Archive.Category}</td>
                                </tr>
                                <tr>
                                    <td>{Archive.Submitted}</td>
                                </tr>
                                <tr>
                                    <td><Moment format="DD-MM-YYYY">{Archive.Date}</Moment></td>
                                </tr>
                            </Link>
                            <td>
                                <div> 
                                    <Link to={`/Ticket/${Archive._id}`} key={Archive._id} >
                                        <i  id='ArchiveEdit' class="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <i onClick={() => handleDelete(Archive._id)} id='ArchiveDelete' class="fa-solid fa-trash"></i> 
                                    <i class="fa-solid fa-arrow-rotate-left" onClick={() => handleArchive(Archive._id)} id='RestoreTicket' ></i>
                                </div> 
                            </td>
                        </tbody> 
                        )
                    }) : (<h2 className='NoTickets'>No Tickets Found.</h2> )
                    }
                </table>
            </section>
            </div>
            )
        }
    </div>
    
)
}

export default TicketArchives