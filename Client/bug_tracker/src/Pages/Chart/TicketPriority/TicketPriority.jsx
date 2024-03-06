import React, { useEffect, useState } from 'react';
import "../TicketPriority/TicketPriority.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement} from "chart.js";
import PriorityLabels from './PriorityLabels/PriorityLabels';

ChartJS.register(ArcElement);

const TicketPriority = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);

    // PRIORITY USESTATE

    const [ LowPriority, setLowPriority ] = useState("")
    const [ MediumPriority, setMediumPriority ] = useState("")
    const [ HighPriority, setHighPriority ] = useState("")
    const [ CriticalPriority, setCriticalPriority ] = useState("")

    // Priority Category

    useEffect(() => {

        const FetchLowPriority = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/PriorityLength/Low`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setLowPriority(Response.data.ArrayLength) 
            })
        } 

        const FetchMediumPriority = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/PriorityLength/Medium`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setMediumPriority(Response.data.ArrayLength)
            })
        } 

        const FetchHighPriority = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/PriorityLength/High`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setHighPriority(Response.data.ArrayLength)
            })
        } 

        const FetchCriticalPriority = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/PriorityLength/Critical`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setCriticalPriority(Response.data.ArrayLength)
            })
        } 

        FetchLowPriority()

        FetchMediumPriority()

        FetchHighPriority()

        FetchCriticalPriority()

        },[])

    const Priority = {

        data: {
        datasets: [{
            data: [LowPriority, MediumPriority, HighPriority, CriticalPriority],
            backgroundColor: [
            '#0F0F0F',
            '#232D3F',
            '#005B41',
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
    <div className='ChartImage' >
        <Doughnut {...Priority}></Doughnut> 
        <PriorityLabels />
    </div>
)
}

export default TicketPriority