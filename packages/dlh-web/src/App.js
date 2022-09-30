import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import { history } from './utils';
import { rootSaga, configStore } from './store';
import { Login } from './pages/login/Login';
import { GoogleAuth } from './pages/googleauth/GoogleAuth';
import { AuthRoute } from 'components'
import {IntlProviderWrapper} from './locales/api/IntlContext';
// import {moment} from 'moment-timezone';

const store = configStore();
store.runSaga(rootSaga);
// const moment2 = moment().tz().setDefault("America/New_York");
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");
export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <IntlProviderWrapper>
                    <Router history={history}>
                        <Switch>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/googleauth'} component={GoogleAuth}/>
                            <AuthRoute>
                                <MainLayout/>
                            </AuthRoute>

                        </Switch>
                    </Router>
                </IntlProviderWrapper>

            </Provider>
        );
    }
}
