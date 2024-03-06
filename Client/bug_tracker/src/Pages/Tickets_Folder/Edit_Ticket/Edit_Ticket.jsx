import React, { useEffect, useState } from 'react';
import "../Create_Ticket/Create_Ticket.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useParams } from 'react-router-dom';

const Edit_Ticket = () => {

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Users, setUsers] = useState([])
    const [Title, setTitle] = useState("")
    const [AllProjects,  setAllProjects] = useState([])
    const [Projects,  setProjects] = useState("")
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState("")
    const [Priority, setPriority] = useState("")
    const [Status, setStatus] = useState("")
    const [Submitted, setSubmitted] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const [Success, setSuccess] = useState("")
    const { id } = useParams()

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleProject = (e) => {
        setProjects(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handlePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleSubmitted = (e) => {
        setSubmitted(e.target.value)
    }

    useEffect(() => {
        Axios.get(`http://localhost:4000/Issues/${id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setTitle(Data.data.Title)
            setProjects(Data.data.Projects)
            setDescription(Data.data.Description)
            setCategory(Data.data.Category)
            setPriority(Data.data.Priority) 
            setStatus(Data.data.Status)
            setSubmitted(Data.data.Submitted)
        })
    }, [])

    const EditTicket = async (e) => {
        e.preventDefault()

        const data = {
            Title, Projects, Description, Category, Priority, Status, Submitted, userOwner
        }
        try {
            Axios.put(`http://localhost:4000/Issues/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Ticket details successfully edited.")
            })
        } catch (error) {
            console.error(error) 
        }
        
    }
    
    useEffect(() => {

        const FetchUsers = () => {
            Axios.get(`http://localhost:4000/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                console.log(Response.data)
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])

    useEffect(() => {

        const FetchProject = () => {
            Axios.get(`http://localhost:4000/Projects/AllProjects`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setAllProjects(Response.data)
            })
        } 
    
        FetchProject()

    },[])

return (
    <div className='Create'>
        <section className='Background'>
            <h1>Edit Ticket</h1>
        </section>
        <section>
            <form onSubmit={EditTicket} method="post" encType="multipart/form-data" >
                <div>
                    <label for="">Ticket Title</label> 
                    <input type="text" name="Title" id="Title" placeholder="Enter Ticket Title..." value={Title} onChange={handleTitle} required />
                </div>
                <div>
                    <label for="">Project Title</label> 
                    <select name="" id="Project" placeholder="Enter Project Name..." value={Projects} 
                    onChange={handleProject} required>
                        <option value="">Select from the options below</option>
                        {
                        AllProjects.map((Project) => {
                            return(
                                <option value={Project.Title}>{Project.Title}</option>
                            )
                        })
                        } 
                    </select> 
                </div>
                <div>
                    <label for="">Description</label>
                    <textarea type="text" className="Description" name='Description' id="Description" cols="1" rows="10" placeholder="Enter Ticket Description..."  value={Description} onChange={handleDescription} required ></textarea>
                </div>
                <article>
                    <section>
                        <div>
                            <label for="">Ticket Category</label>
                            <select name="" id="Select" value={Category} onChange={handleCategory} required >
                                <option value="">Select from the options below</option>
                                <option value="Defect">Defect</option>
                                <option value="Documentation">Documentation</option>
                                <option value="Enhancement">Enhancement</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Hardware Problem">Hardware Problem</option>
                            </select>
                        </div> 
                        <div>
                            <label for="">Priority</label>
                            <select name="" id="Select" value={Priority} onChange={handlePriority} required >
                                <option value="">Select from the options below</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </section>
                    <section>
                        <div>
                            <label for="">Status</label>
                            <select name="" id="Select" value={Status} onChange={handleStatus} required >
                                <option value="">Select from the options below</option>
                                <option value="Open">Open</option>
                                <option value="In_Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label for="">Submitted By</label>
                            <select name="" id="Select" value={Submitted} onChange={handleSubmitted} required >
                                <option value="">Select from the options below</option>
                                {
                                Users.map((User) => {
                                    return(
                                            <option value={User.Name}>{User.Name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </section>
                </article>
                <div className='Submit' >
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={EditTicket} type="submit">Save Changes</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default Edit_Ticket 