import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { parse } from 'qs';

import UserService from './../../../services/UserService';
import ResetPasswordForm from './ResetPasswordForm';
import {login} from './../../../store/user/user.actions';

const ResetPassword = (props) => {
    const query = parse(window.location.search.substring(1));
    const submit = (password) => {
        UserService.resetPassword({...query,password}).then( ({ status }) => {
            if (UserService.isOkStatus(status)) {
                props.login(query.username, password)
            } 
        })        
    };
    return (
        <div>
            <ResetPasswordForm submit={submit}/>
        </div>
    )
};

const mapActions = (dispatch) => ({
    login: (username, password) => {
        dispatch(login({ username, password }))
    }
});

export default connect(null,mapActions)(ResetPassword);