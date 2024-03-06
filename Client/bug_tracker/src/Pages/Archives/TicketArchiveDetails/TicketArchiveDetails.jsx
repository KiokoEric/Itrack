import React, { useEffect, useState } from 'react';
import LoadingGif from "../../../Images/LoadingGif.gif";
import "../TicketArchiveDetails/TicketArchiveDetails.css";
import Axios from "axios";
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";


const TicketArchiveDetails = () => {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [Cookie, setCookie] = useCookies(["auth_token"])
    const [AllComments, setAllComments] = useState([])
    const [TicketID, setTicketID] = useState("")
    const [Tickets, setTickets] = useState([])

    // Get Ticket by ID section

    useEffect(() => {

        const FetchTickets = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/TicketArchives/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
                setTicketID(Response.data.ID)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } 
    
        FetchTickets()
    
        },[])

    // Fetch Comments by Ticket ID Section

    useEffect(() => {

        const FetchComments = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Comments/Comment/${TicketID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setAllComments(Response.data)     
            })
        }

        if (TicketID) {
            FetchComments()
        }

    },[TicketID])

return (
    <div>
        {isLoading ? (
            <div className='Gif' >
                <img src={LoadingGif} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div className='TicketArchiveDetails' >
            <article >
                <h1>Archived Ticket Details</h1>
            </article>
            <article className='TicketArchives' >
                <section>
                        <div className='TicketTitle' >
                            <h2><b>{Tickets.Title}</b></h2>
                            <div className='TicketDate'>
                                <b>Ticket Date: <Moment format="DD-MM-YYYY">{Tickets.Date}</Moment></b>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h3>Ticket Description</h3>
                            <p>{Tickets.Description}</p> 
                        </div>
                        <div className='ProjectName' >
                            <h3>Project Name</h3>
                            <p>{Tickets.Projects}</p>
                        </div>
                        <div className='CategorySubmission' >
                            <h4>Ticket Category: {Tickets.Category}</h4>
                            <h4>Submitted By: {Tickets.Submitted}</h4>
                        </div>
                </section>
                <section className='ArchivedComments' >
                    <h2>Ticket Comments</h2>
                    <hr />
                    <ul>
                        { (AllComments.length > 0) ? 
                            AllComments.map((AllComment) => {
                                return(
                                    <li>
                                        <p><i class="fa-solid fa-comment"></i>{AllComment.Comment}</p>
                                        <section id='CommentDetails'>
                                            <div>
                                                <i class="fa-solid fa-calendar"></i>
                                                <p><Moment format="DD-MM-YYYY">{AllComment.Date}</Moment></p>
                                            </div>
                                            <div>
                                                <i class="fa-solid fa-user"></i>
                                                <p>{AllComment.Submitted}</p>
                                            </div> 
                                        </section>
                                    </li>
                                )
                            }) : (
                                <h2 className='NoComments'>No Comments Found.</h2> 
                            )
                        }
                    </ul>
                </section>
            </article >
            </div>
            )
        }
    </div>
    
)
}

export default TicketArchiveDetails