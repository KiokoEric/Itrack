import React from 'react';
import "../StatusLabels/StatusLabels.css";

const StatusLabels = () => {
return (
    <div className='StatusLabels' >
        <article>
            <h3>Labels</h3>
            <section>
                <div className='Indicator Open'></div>
                <p>Open</p>
            </section>
            <section>
                <div className='Indicator Progress'></div>
                <p>In Progress</p>
            </section>
            <section>
                <div className='Indicator Resolved'></div>
                <p>Resolved</p> 
            </section>
            <section>
                <div className='Indicator Done'></div>
                <p>Done</p>
            </section> 
        </article>
    </div>
)
}

export default StatusLabels