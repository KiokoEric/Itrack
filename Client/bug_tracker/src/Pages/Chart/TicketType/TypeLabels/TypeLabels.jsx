import React from 'react';
import "../TypeLabels/TypeLabels.css";

const TypeLabels = () => {
return (
    <div className='TypeLabels'>
        <article>
            <h3>Labels</h3>
            <section>
                <div className='Indicator Defect'></div>
                <p>Defect</p>
            </section>
            <section>
                <div className='Indicator Documentation'></div>
                <p>Documentation</p>
            </section>
            <section>
                <div className='Indicator Enhancement' ></div>
                <p>Enhancement</p>
            </section>
            <section>
                <div className='Indicator Feature'></div>
                <p>Feature Request</p> 
            </section>
            <section>
                <div className='Indicator Hardware' ></div>
                <p>Hardware Problem</p> 
            </section>  
        </article>
    </div>
)
}

export default TypeLabels