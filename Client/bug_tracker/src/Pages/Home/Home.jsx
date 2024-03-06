import React, { useEffect, useState } from 'react';
import "../Home/Home.css";
import Axios from "axios";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { FaUser } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { IoFolderOpenSharp } from "react-icons/io5"; 
import ProjectImage from "../../Images/ProjectImage.png"
import TicketType from '../Chart/TicketType/TicketType';
import TicketStatus from '../Chart/TicketStatus/TicketStatus';
import TicketPriority from '../Chart/TicketPriority/TicketPriority';

const Home = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Tickets, setTickets] = useState('')
    const [Projects, setProjects] = useState([])
    const [ProjectLength, setProjectLength] = useState("")
    const [Users, setUsers] = useState("")

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchProjects = async () => {
        await Axios.get(`http://localhost:4000/Projects/AllProjects`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            console.log(Response.data)
            setProjects(Response.data)
        })
    }

    fetchProjects()

    },[])

    // Number of Projects

    useEffect(() => {

    const ProjectNumber = async () => {
        await Axios.get(`http://localhost:4000/Projects/AllProjectsLength`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            setProjectLength(Response.data.ArrayLength)
        })
    }

    ProjectNumber()

    },[])

    // Number of Tickets

    useEffect(() => {

    const TicketNumber = async () => {
        await Axios.get(`http://localhost:4000/Issues/AllIssuesLength`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            setTickets(Response.data.ArrayLength)
        })
    }

    TicketNumber()

    },[])

        // Number of Users

    useEffect(() => {

    const UserNumber = async () => {
        await Axios.get(`http://localhost:4000/Users/UsersLength`, {
        headers: { authorization: Cookie.auth_token },
        
        }) 
        .then((Response) => {
            setUsers(Response.data.ArrayLength)
        })
    }

    UserNumber()

    },[])

return (
    <div className='Home'>
        <section className='ItrackSummary' >
            <div>
                <h1><IoFolderOpenSharp size="2.35rem" className='SummaryIcon'  />Total Projects</h1> 
                <h1>{ProjectLength}</h1>
            </div>
            <div>
                <h1><IoMdPricetags size="2.35rem" className='SummaryIcon' />Total Tickets</h1>
                <h1>{Tickets}</h1>
            </div>
            <div>
                <h1><FaUser size="2.1rem" className='SummaryIcon' />Total Number of Users</h1>
                <h1>{Users}</h1>
            </div> 
        </section> 
        <section className='ProjectDashboard' >
            <h2>Projects</h2>
            <article>
                {
                (Projects.length > 0) ?  
                Projects.map((Project) => {
                    return(
                        <Link className='Link' to={`/ProjectDetails/${Project._id}`} >
                            {Project.Image ? (<img src={Project.Image} alt="" width="350px" height="250px" /> ) : (<img src={ProjectImage} alt="" width="350px" height="250px" />) }
                            <p>{Project.Title}</p>
                        </Link>
                    )
                }) : <h2 className='Failure'>No Projects Found.</h2> 
                }
            </article>
        </section>
        <section className='TicketCharts' > 
            <div>
                <h3>Ticket by Status</h3>
                <TicketStatus /> 
            </div>
            <div>
                <h3>Ticket by Priority</h3>
                <TicketPriority />  
            </div>
            <div className='TypeChart' >
                <h3>Ticket by Type</h3>
                <TicketType />
            </div>
        </section> 
    </div> 
)
}

export default Home