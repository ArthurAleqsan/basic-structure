import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store, { history } from './store/configureReduxStore';
import Routes from './containers/router';
import Loader from './components/componentsLib/Loader';
import './../assets/styles/index.scss';
import './i18n';
render((
    <Provider store={store} >
        <Router history={history}>
            {/* <React.unstable_ConcurrentMode > */}
            <Suspense fallback={<Loader />}>
                <Routes />
            </Suspense>
            {/* </React.unstable_ConcurrentMode> */}
        </Router>
    </Provider>
), document.getElementById('app'));