import React from 'react';
import "../PriorityLabels/PriorityLabels.css";

const PriorityLabels = () => {
return (
    <div className='PriorityLabels' >
        <article>
            <h3>Labels</h3>
            <section>
                <div className='Indicator Low'></div>
                <p>Low Priority</p>
            </section>
            <section>
                <div className='Indicator Medium' ></div>
                <p>Medium Priority</p>
            </section>
            <section>
                <div className='Indicator High' ></div>
                <p>High Priority</p>
            </section>
            <section>
                <div className='Indicator Critical' ></div>
                <p>Critical Priority</p>
            </section>
        </article>
    </div>
)
}

export default PriorityLabels