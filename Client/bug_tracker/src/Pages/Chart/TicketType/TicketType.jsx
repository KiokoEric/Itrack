import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import TypeLabels from './TypeLabels/TypeLabels';

ChartJS.register(ArcElement);

const TicketType = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);

    // CATEGORY USESTATE

    const [ Defect, setDefect ] = useState("")
    const [ Documentation, setDocumentation ] = useState("")
    const [ Enhancement, setEnhancement ] = useState("")
    const [ Feature, setFeature ] = useState("")
    const [ Hardware, setHardware ] = useState("")

    useEffect(() => {

        const FetchDefect = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/CategoryLength/Defect`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDefect(Response.data.ArrayLength)
            })
        } 

        const FetchDocumentation = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/CategoryLength/Documentation`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDocumentation(Response.data.ArrayLength)
            })
        } 

        const FetchEnhancement = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/CategoryLength/Enhancement`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setEnhancement(Response.data.ArrayLength)
            })
        } 

        const FetchFeature = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/CategoryLength/Feature_Request`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setFeature(Response.data.ArrayLength)
            })
        } 

        const FetchHardware = () => {
            Axios.get(`https://itrack-server-9s7w.onrender.com/Issues/CategoryLength/Hardware_Problem`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setHardware(Response.data.ArrayLength) 
            })
        } 

        FetchDefect() 

        FetchDocumentation()

        FetchEnhancement()

        FetchFeature()

        FetchHardware()

        },[])

    const Category = {

        data: {
        datasets: [{
            data: [Defect, Documentation, Enhancement, Feature, Hardware],
            backgroundColor: [
            '#0E2954',
            '#1F6E8C',
            '#03001C',
            '#301E67',
            '#43766C' 
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
        <Doughnut {...Category}></Doughnut>
        <TypeLabels />
    </div>
)
}

export default TicketType
