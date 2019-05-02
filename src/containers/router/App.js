import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderPrivate from './../../components/headers/private';
import Questions from './../AdminDashboard/adminPages/question';
import Answers from './../AdminDashboard/adminPages/answers';


const App = props => {
    return (
        <React.Fragment>
            <section className='main-container-content isSignin-user-main-container-content'>
                <section className='main-container-header'>
                    <HeaderPrivate logout = {props.logout}/>
                </section>
                <Switch>
                    <Route path='/question' component={(Questions)} />
                    <Route path='/answers' component={(Answers)} />
                </Switch>
            </section>
        </React.Fragment>
    )
}
export default App;