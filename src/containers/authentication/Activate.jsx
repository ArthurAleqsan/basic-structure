import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { parse } from 'qs';

import UserService from './../../services/UserService';

const Activate = () => {
    const [status, setStatus] = useState('waiting');
    const query = parse(window.location.search.substring(1));
    useEffect(() => {
        if (status === 'waiting') {
            UserService.activate(query).then( ({ status }) => {
                //if (UserService.isOkStatus(status))
                setStatus('ok') ;
            })
        } 
    });
    return (
        status === 'ok' ? <Redirect to={'/'}/> : <div>{status}</div>
    )
};

export default Activate;