import React, { useState } from 'react';
import "../SideBar/SideBar.css";
import { AdministrationLogin } from "../Hooks/Administrator"; 
import { useCookies } from "react-cookie";
import { Link , useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillTagFill } from "react-icons/bs";
import { BsFillTagsFill } from "react-icons/bs";
import { FaArchive } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { MdFolderShared } from "react-icons/md";
import { SiCommerzbank } from "react-icons/si";
import { IoMdPricetags } from "react-icons/io";
import { IoFolderOpenSharp } from "react-icons/io5"; 

export const SideBar = () => {

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);
    const [Showproject, setShowproject] = useState(false);
    const [Showticket, setShowticket] = useState(false);

    const Administrator = AdministrationLogin()
    const navigate = useNavigate()

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <article className='SideBar'>
        <section>
            <div>
                <figure className='Itrack' >
                    <i class="fa-solid fa-bugs"></i>
                    <figcaption>
                        <h1>Itrack</h1>
                    </figcaption>
                </figure>
            </div>
            <div className='Navigation' >
                <Link to="/Home" className='Link' >
                    <MdDashboard className='ReactIcon' />
                    Dashboard
                </Link>
                <section className='accordion'>
                    <h3 onClick={() => setShowproject(!Showproject)} ><IoFolderOpenSharp className='ReactIcon' />Projects</h3>
                    {Showproject ? (
                        <article>
                            <Link to="/Project" className='Link Icon' >
                                <FaFolderPlus className='ReactIcon'  />
                                Create Project
                            </Link>
                            <Link to="/My_Projects" className='Link Icon' >
                                <MdFolderShared className='ReactIcon'  />
                                My Projects
                            </Link>
                            <Link to="/All_Projects" className='Link Icon' >
                                <FaFolder className='ReactIcon'  />
                                All Projects
                            </Link>
                            <Link to="/ProjectArchives" className='Link Icon' >
                                <FaArchive className='ReactIcon'  />
                                Archived Projects
                            </Link>
                        </article>
                    ) : ""}
                </section>
                <section className='accordion' >
                    <h3 onClick={() => setShowticket(!Showticket)}  ><IoMdPricetags className='ReactIcon' />Tickets</h3>
                    {
                    Showticket ? (
                        <article>
                            <Link to="/Ticket" className='Link Icon' >
                                <BsFillTagFill className='ReactIcon'  />
                                Create Ticket
                            </Link>
                            <Link to="/My_Tickets" className='Link Icon' >
                                <FaUserTag className='ReactIcon'  />
                                My Tickets
                            </Link>
                            <Link to="/All_Tickets" className='Link Icon' >
                                <BsFillTagsFill className='ReactIcon'  />
                                All Tickets
                            </Link>
                            <Link to="/TicketArchives" className='Link Icon' >
                                <FaArchive className='ReactIcon'  />
                                Archived Tickets
                            </Link>
                        </article>
                    ) : ""
                    }
                </section>
                <Link to="/Administration" className='Link' >
                    <SiCommerzbank className='ReactIcon'  />
                    Administration
                </Link>
            </div>
        </section>
        <section>
            <div className='UserNavigation' >
                {Administrator ? <Link to="/Registration" className='Link' > <AiOutlineUserAdd /> Create New User</Link> : null}
                {
                !Cookie.auth_token ?
                (
                    <Link to="/" className='Link' >
                        <FiLogIn className='ReactIcon' />
                        Login
                    </Link>
                ) : 
                (
                    <button onClick={Logout} className='Logout'>
                        <BiLogOut className="ReactIcon" />
                        Logout
                    </button>
                )
                }
            </div>
        </section>
    </article>
)
}
