import React, { useEffect, useState } from 'react';
import "../Ticket_Details/Ticket_Details.css";
import LoadingGif from "../../../Images/LoadingGif.gif";
import Axios from "axios";
import Moment from 'react-moment';
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID"; 

const Ticket_Details = () => {

    const UserID = useGetUserID(); 

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [Cookie, setCookie] = useCookies(["auth_token"])
    const [AllComments, setAllComments] = useState([])
    const [Comment, setComment] = useState("")
    const [CommentError, setCommentError] = useState("")
    const [Success, setSuccess] = useState("")
    const [TicketID, setTicketID] = useState("")
    const [Tickets, setTickets] = useState([])
    const [Projects, setProjects] = useState([])
    const [ProjectName, setProjectName] = useState("")
    const [Users, setUsers] = useState([])
    const [Submitted, setSubmitted] = useState("")
    const [Assigned, setAssigned] = useState([])
    const [userOwner, setuserOwner] = useState(UserID)

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmitted = (e) => {
        setSubmitted(e.target.value)
    }

    // Get Ticket by ID section

    useEffect(() => {

    const FetchTickets = () => {
        Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/${id}`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            console.log(Response.data)
            setTickets(Response.data)
            setTicketID(Response.data._id)
            setProjectName(Response.data.Projects)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    } 

    FetchTickets()

    },[])

    // Fetch Project by Name Section

    useEffect(() => {

        const FetchProject = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Projects/Title/${ProjectName}`, {
            headers: { authorization: Cookie.auth_token }
            }) 
            .then((Response) => {
                setAssigned(Response.data.Assigned)
                setProjects(Response.data)
            })
        }

        if (ProjectName) {
            FetchProject()
        }

    },[ProjectName])

    // Fetch Comment by Ticket ID Section

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

    // Fetch Users

    useEffect(() => {

        const FetchUsers = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])

    // Add Comment Section

    const AddComment = (e) => {
        e.preventDefault()

        if (Comment === "") {
            setCommentError("Kindly add a name and comment!") 
        } else {
            const data = {
                Comment, TicketID, Submitted, userOwner
            }
            try {
                Axios.post("https://itrack-server-9s7w.onrender.com/Comments/AddComment", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setSuccess("Comment successfully added.") 
                    window.location.reload()
                    setComment("")
                })
            } catch (error) {
                
                console.error(error) 
            }
        }
    }

return (
    <div>
        {isLoading ? (
            <div className='Gif' >
                <img src={LoadingGif} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div className='TicketDetails' >
            <article className='ProjectSection' >
            <section>
                <h2>Project Details</h2>
                <figure>
                    <img src={Projects.Image} alt="" width="400px" height="300px" />
                </figure>
                <figcaption>
                    <h2>{Projects.Title}</h2>
                    <p>{Projects.Description}</p>
                    <p><b>Priority Level</b>: {Projects.Priority}</p>
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
                    })}</p>
                </figcaption>
            </section>
        </article>
        <article className='TicketSection' >
            <section>
                <div className='TicketTitle' >
                    <h2><b>{Tickets.Title}</b></h2>
                    <div className='TicketDate'>
                        <b>Ticket Date: <Moment format="DD-MM-YYYY">{Tickets.Date}</Moment></b>
                        <Link className='TicketEdit' to={`/Ticket/${Tickets._id}`} key={Tickets._id} >
                            <i id='EditAction' class="fa-solid fa-pen-to-square"></i>
                        </Link> 
                    </div>
                </div>
                <hr />
                <div>
                    <h3>Ticket Description</h3>
                    <p>{Tickets.Description}</p> 
                </div>
                <div className='CategorySubmission' >
                    <h4>Ticket Category: {Tickets.Category}</h4>
                    <h4>Submitted By: {Tickets.Submitted}</h4>
                </div>
            </section>
            <section className='CommentSection' >
                <h2>Comments</h2>
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
            <section> 
                <h2>Add a Comment</h2>
                <textarea name="" id="" value={Comment} onChange={handleComment} cols="30" rows="10"></textarea>
                <label for="">Submitted By</label>
                    <select name="" id="Submitted" value={Submitted} onChange={handleSubmitted} required >
                        <option value="">Select from the options below</option>
                        {
                        Users.map((User) => {
                            return(
                                <option value={User.Name}>{User.Name}</option> 
                            )
                        })
                        }
                    </select>
                <p className='Error'>{CommentError}</p>
                <h4 className='Success'>{Success}</h4>
                <button onClick={AddComment}>Add Comment</button>
            </section>
        </article>
        </div> 
            )
        }
    </div>
)
}

export default Ticket_Details