import React from 'react';
import Axios from "axios";
import "../Register/Register.css";
import { useState } from 'react';
import { useSnackbar } from 'notistack';

const Register = () => { 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRole = (e) => {
        setRole(e.target.value)
    }

    const onRegister = async (e) => {
        e.preventDefault()
        const data = {
            Name, Email, Password, Role 
        }
        try {
            await Axios.post("http://localhost:4000/Users/Registration", data)
            enqueueSnackbar("Successfully Registered !" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right', 
                },
            }) 
        } catch (error) {
            enqueueSnackbar("Registered successfully!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right', 
                },
            }) 
        }
    }

return (
    <div className='Register' >
        <section>
            <h1>Create New User</h1>
        </section>
        <section>
            <form onSubmit={onRegister} method="post" encType="multipart/form-data">
                <div>
                    <label for=""><p>Name</p></label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} />
                </div>
                <div>
                    <label for=""><p>Email</p></label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
                </div>
                <div>
                    <label for=""><p>Password</p></label>
                    <article>
                        <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword}/>
                        {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                    </article>
                </div>
                <div>
                    <label for="">Assign Role</label>
                    <select name="" id="Select" value={Role} onChange={handleRole} required >
                        <option value="">Select from the options below</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Back End Web Developer">Back End Web Developer</option>
                        <option value="Database Administrator">Database Administrator</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Quality Assurance Engineer">Quality Assurance Engineer</option>
                        <option value="Security Engineer">Security Engineer</option>
                        <option value="Front End Web Developer">Front End Web Developer</option>
                        <option value="System Architect">System Architect</option>
                        <option value="Technical Writer">Technical Writer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                    </select>
                </div>
                <button onClick={onRegister} type="submit">Create New User</button>
            </form>
        </section> 
    </div>
)
}

export default Register