import React, { useEffect, useState } from 'react';
import "../Create_Project/Create_Project.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useParams } from 'react-router-dom';

const Edit_Project = () => {

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [StartDate, setStartDate] = useState("")
    const [EndDate, setEndDate] = useState("")
    const [Priority, setPriority] = useState("")
    const [Manager, setManager] = useState("")
    const [Assigned, setAssigned] = useState([])
    const [Users, setUsers] = useState([])
    const [ShowAssigned, setShowAssigned] = useState(false);
    const [Image, setImage] = useState("")
    const [Success, setSuccess] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const { id } = useParams()

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handlePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const handleManager = (e) => {
        setManager(e.target.value)
    }

    const handleAssigned = (e) => {
        setAssigned(
            [...Assigned, {Name: e.target.value}]
        );
    }

    const handleImage = (e) => {
        setImage(e.target.value)
    }

    useEffect(() => {
        Axios.get(`https://itrack-server-9s7w.onrender.com/Projects/${id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setTitle(Data.data.Title)
            setDescription(Data.data.Description)
            setPriority(Data.data.Priority)
            setStartDate(Data.data.StartDate)
            setEndDate(Data.data.EndDate) 
            setManager(Data.data.Manager)
            setImage(Data.data.Image)
        })
    }, [])

    const EditProject = async (e) => {
        e.preventDefault()

        const data = {
            Title, Description, Priority, StartDate, EndDate, Manager, Assigned, Image, userOwner
        }
        try {
            Axios.put(`https://itrack-server-9s7w.onrender.com/Projects/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Project details successfully edited.")
            })
        } catch (error) {
            console.error(error) 
        }
        
    }

    useEffect(() => {

        const FetchUsers = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                console.log(Response.data)
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])


return (
    <div className='Project'>
        <section id='Background'>
            <h1>Edit Project</h1>
        </section>
        <section>
            <form onSubmit={EditProject} method="post" encType="multipart/form-data" >
                <div>
                    <label for="">Project Title</label> 
                    <input type="text" name="Title" id="Title" placeholder="Enter Project Title..." value={Title} onChange={handleTitle} required />
                </div>
                <section className='ProjectImage' >
                    <div>
                        <label for="">Project Image</label>
                        <input type="text" name="Image" id="Image" placeholder='Enter Image Url...' value={Image} onChange={handleImage} required />
                    </div>
                </section>
                <div>
                    <label for="">Description</label>
                    <textarea type="text" className="Description" name='Description' id="Description" cols="1" rows="10" placeholder="Enter Project Description..."  value={Description} onChange={handleDescription} required ></textarea>
                </div>
                <article>
                    <section className='PriorityDate' >
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
                        <div>
                            <label for="">Start Date</label>
                            <input type="date" placeholder='Enter the Date' value={StartDate} onChange={handleStartDate}  name="" id="" />
                        </div>
                        <div>
                            <label for="">End Date</label>
                            <input type="date" placeholder='Enter the Date' value={EndDate} onChange={handleEndDate}  name="" id="" />
                        </div>
                    </section>
                    <section> 
                        <div>
                            <label for="">Project Manager</label>
                            <select name="" id="Select" value={Manager} onChange={handleManager} required >
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
                        <div>
                            <label for="" className='Assigned' onClick={() => setShowAssigned(!ShowAssigned)} >Assigned Developer(s)</label>
                            {
                            ShowAssigned ? (
                                <div className='AvailableDevelopers' >
                                    {
                                        Users.map((User, index) => {
                                            return(
                                            <div className='CheckBox'>
                                                <input type='checkbox' id={User.Name} key={index} value={User.Name} onChange={handleAssigned} />
                                                <label htmlFor="" id={User.Name} >{User.Name}</label>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : ""
                            }
                        </div>
                    </section>
                </article>
                <div className='Submit' >
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={EditProject} type="submit">Save Changes</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default Edit_Project