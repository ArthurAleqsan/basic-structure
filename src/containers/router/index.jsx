import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ParalaxMain from './../parallax/homePage';
import ParalaxIndustries from './../parallax/industriesPage';
import Header from './../../components/componentsLib/Header';
import { HomePage } from './../pages/HomePage';
import { Industries } from './../pages/Industries';


class MainRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='main-container'>
                <Router>
                    <Route
                        component={({ location }) => {
                            return (<div>
                                <Header />
                                <div className='main-content'>
                                    <TransitionGroup component={null} >
                                        <CSSTransition
                                            timeout={300}
                                            classNames="page"
                                            key={location.key}
                                        >
                                            <Switch>
                                                <Route path="/industries" component={() => (<Industries><ParalaxIndustries /></Industries>)} />
                                                <Route path="/services" component={() => (<div> services</div>)} />
                                                <Route path="/careers" component={() => (<div> careers</div>)} />
                                                <Route path="/" component={() => (<HomePage><ParalaxMain /></HomePage>)} />
                                            </Switch>
                                        </CSSTransition>
                                    </TransitionGroup>
                                </div>
                            </div>
                            )
                        }
                        } />
                </Router>
            </div>
        );
    }
}

export default withRouter(MainRouter);
