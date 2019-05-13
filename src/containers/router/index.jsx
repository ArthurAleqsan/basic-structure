import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';


import App from './App';

class Router extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='main-container'>
                <Switch>
                    <Route path = '/'  component={App} /> 
                </Switch>
            </div>
        );
    }
}

export default withRouter(Router);
