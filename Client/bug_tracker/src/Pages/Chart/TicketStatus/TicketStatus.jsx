import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement} from "chart.js";
import StatusLabels from './StatusLabels/StatusLabels';

ChartJS.register(ArcElement);

const TicketStatus = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);

    // STATUS USESTATE

    const [Open, setOpen] = useState("")
    const [Progress, setProgress] = useState("")
    const [Resolved, setResolved] = useState("")
    const [Done, setDone] = useState("")

    // Status Category

    useEffect(() => {

        const FetchOpen = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/StatusLength/Open`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setOpen(Response.data.ArrayLength)
            })
        } 

        const FetchProgressStatus = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/StatusLength/In_Progress`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setProgress(Response.data.ArrayLength)
            })
        } 

        const FetchResolvedStatus = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/StatusLength/Resolved`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setResolved(Response.data.ArrayLength)
            })
        } 

        const FetchDoneStatus = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/StatusLength/Done`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDone(Response.data.ArrayLength)
            })
        } 

        FetchOpen()

        FetchProgressStatus()

        FetchResolvedStatus()

        FetchDoneStatus()

        },[])

        const Status = {

            data: {
            datasets: [{
                data: [Open, Progress, Resolved, Done],
                backgroundColor: [
                    '#071952',
                    '#0B666A',
                    '#03001C',
                    '#301E67' 
                ],
                hoverOffset: 4,
                borderRadius: 5, 
                spacing: 0,
            }]},
        
            options: {
                cutout: 10 
            }
        }

return (
    <div className='ChartImages' >
        <Doughnut {...Status}></Doughnut>
        <StatusLabels />
    </div>
)
}

export default TicketStatus