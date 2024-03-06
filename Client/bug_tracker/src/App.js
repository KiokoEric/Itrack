import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdministrationLogin } from "./Components/Hooks/Administrator"; 
import { useGetUserID } from "./Components/Hooks/UseGetUserID";
import { SideBar } from './Components/SideBar/SideBar';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
import Register from './Pages/User/Register/Register';
import Edit_Project from './Pages/Projects_Folder/Edit_Project/Edit_Project';
import Ticket from './Pages/Tickets_Folder/All_Tickets/All_Tickets';
import Administration from './Pages/Administration/Administration';
import My_Tickets from './Pages/Tickets_Folder/My_Tickets/My_Tickets';
import My_Projects from './Pages/Projects_Folder/My_Projects/My_Projects';
import Project_Details from './Pages/Projects_Folder/Project_Details/Project_Details';
import Created_Projects from './Pages/Projects_Folder/Created_Projects/Created_Projects';
import Create_Project from './Pages/Projects_Folder/Create_Project/Create_Project';
import ProjectArchiveDetails from './Pages/Archives/ProjectArchiveDetails/ProjectArchiveDetails';
import Create_Ticket from './Pages/Tickets_Folder/Create_Ticket/Create_Ticket';
import Edit_Ticket from './Pages/Tickets_Folder/Edit_Ticket/Edit_Ticket';
import Profile from './Pages/User/Profile/Profile';
import EditDetails from './Pages/User/EditDetails/EditDetails';
import Ticket_Details from './Pages/Tickets_Folder/Ticket_Details/Ticket_Details';
import DeleteProfile from './Pages/User/DeleteProfile/DeleteProfile';
import ProjectArchives from './Pages/Archives/ProjectArchives/ProjectArchives';
import TicketArchives from './Pages/Archives/TicketArchives/TicketArchives';
import TicketArchiveDetails from './Pages/Archives/TicketArchiveDetails/TicketArchiveDetails';


function App() {

  const Administrator = AdministrationLogin()
  const ID = useGetUserID()

  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path='/Home' element={ Administrator || ID ? <Home /> : <Navigate to="/" /> } />
        <Route path='/Project' element={Administrator || ID ? <Create_Project /> : <Navigate to="/" />  } />
        <Route path='/Project/:id' element={<Edit_Project />} />
        <Route path='/ProjectDetails/:id' element={<Project_Details />} />
        <Route path='/All_Projects' element={Administrator || ID  ? <Created_Projects /> : <Navigate to="/" />  } />
        <Route path='/My_Projects' element={Administrator || ID  ?<My_Projects /> : <Navigate to="/" />  } />
        <Route path='/ProjectArchives' element={Administrator || ID  ?<ProjectArchives /> : <Navigate to="/" /> } />
        <Route path='/ProjectDetailsArchives/:id' element={<ProjectArchiveDetails />} />
        <Route path="/Ticket" element={Administrator || ID  ? <Create_Ticket /> : <Navigate to="/" /> } />
        <Route path='/All_Tickets' element={Administrator || ID  ? <Ticket /> : <Navigate to="/" /> } />
        <Route path='/Ticket/:id' element={<Edit_Ticket />} />
        <Route path='/TicketDetails/:id' element={<Ticket_Details />} />
        <Route path='/My_Tickets' element={Administrator || ID  ? <My_Tickets /> : <Navigate to="/" /> } />
        <Route path='/TicketArchives' element={Administrator || ID  ? <TicketArchives /> : <Navigate to="/" /> } />
        <Route path='/TicketDetailsArchives/:id' element={ <TicketArchiveDetails /> } />
        <Route path='/Administration' element={Administrator ? <Administration /> : <Navigate to="/" /> }  />
        <Route path='/' element={<Login />} />
        <Route path='/Registration' element={Administrator || ID  ? <Register /> : <Navigate to="/" /> } />
        <Route path='/Profile/:id' element={<Profile />} />
        <Route path='/Edit/:id' element={<EditDetails />} />
        <Route path='/DeleteProfile/:id' element={<DeleteProfile />} />
      </Routes>
    </div>
  );
}

export default App;
