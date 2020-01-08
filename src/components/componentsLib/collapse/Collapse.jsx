import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Collapse = ({ children, headers }) => {
    const [height, setHeight] = useState(null);
    const [activeTab, setActiveTab] = useState(null);

    const togglePanel = (e, index) => {
        if (e.target.id.indexOf('panel') > -1) return
        setActiveTab(index);
        const elem = document.getElementById(index);
        const content = elem.childNodes[0];
        console.log(elem.childNodes);
        if (height) {
            setHeight(null)
        } else {
            setHeight((+content.scrollHeight) + "px");
        }
    };
    const getNumberFromHeight = (str) => {
        return +str.split('px')[0];
    };
    return (
        <div className='collapse-container'>
            {headers.map((header, index) => <div
                key={index}
                className={`${activeTab === index && height ? 'active ' : ''}collapse-item`}
                style={{ height: activeTab === index && height ? getNumberFromHeight(height) + 150 : 150 }}
                onClick={(e) => togglePanel(e, index)}
            >
                <div className='colapse-header-container'>
                    <p>{header}</p>
                    <img src={activeTab === index && height ? '/assets/images/diagonal-arrow-white.svg' : '/assets/images/diagonal-arrow.svg'} className='img-icon' />
                </div>
                <div
                    className='panel-desc'
                    id={`${index}`}
                    style={{ maxHeight: activeTab === index ? height : 0, visibility: height ? 'visible' : 'hidden' }}
                >
                    {children[index]}
                </div>
            </div>)}
        </div>
    )
};
Collapse.propTypes = {
    children: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
};
export default Collapse;
