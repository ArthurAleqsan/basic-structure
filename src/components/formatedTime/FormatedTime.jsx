import React from 'react';
import PropsTypes from 'prop-types';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const FormatedTime = ({value}) => {
    const date = new Date(value);
    //const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const month = monthNames[date.getMonth()];
    const d = date.getDate();
    return <div className = 'notification-date'>
        {d} {month} {hour}:{minutes}
    </div>
};

FormatedTime.propTypes = {
    value: PropsTypes.string.isRequired,
};

export default FormatedTime;