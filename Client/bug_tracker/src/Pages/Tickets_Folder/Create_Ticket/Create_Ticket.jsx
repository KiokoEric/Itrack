import React, { useEffect, useState } from 'react';
import "../Create_Ticket/Create_Ticket.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";

const Create_Ticket = () => {

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Users, setUsers] = useState([])
    const [AllProjects,  setAllProjects] = useState([])
    const [Projects,  setProjects] = useState("")
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState("")
    const [Priority, setPriority] = useState("")
    const [Status, setStatus] = useState("")
    const [Submitted, setSubmitted] = useState([])
    const [userOwner, setuserOwner] = useState(UserID)
    const [Error, setError] = useState("")
    const [Success, setSuccess] = useState("")
    const [ErrorField, setErrorField] = useState("")

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

    Axios.defaults.withCredentials = true;

    const AddTicket = async (e) => {
        e.preventDefault()

        if (!UserID) {
            setError('Kindly log in!') 
        }
        else if (Title === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Projects === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Description === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Category === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Priority === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Status === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if (Submitted === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else {
            const data = {
                Title, Projects, Description, Category, Priority, Status, Submitted, userOwner
            }
            try {
                Axios.post("http://localhost:4000/Issues/AddIssue", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setErrorField("")
                    setSuccess("Ticket successfully created.") 
                })
            } catch (error) {
                console.error(error) 
            }
        }
    }  

    useEffect(() => {

        const FetchUsers = () => {
            Axios.get(`http://localhost:4000/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
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
            <h1>Create Ticket</h1>
        </section>
        <section>
            <form onSubmit={AddTicket} method="post" encType="multipart/form-data" >
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
                                <option key={Project._id} value={Project.Title}>{Project.Title}</option>
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
                                <option value="Feature_Request">Feature Request</option>
                                <option value="Hardware_Problem">Hardware Problem</option>
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
                        </div>
                    </section>
                </article>
                <div className='Submit' >
                    <h3 className='ErrorField'>{ErrorField}</h3>
                    <h4 className='Error'>{Error}</h4>
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={AddTicket} type="submit">Create Ticket</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default Create_Ticket