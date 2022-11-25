import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import { history } from './utils';
import { rootSaga, configStore } from './store';
import { Login } from './pages/login/Login';
import { GoogleAuth } from './pages/googleauth/GoogleAuth';
import { AuthRoute } from 'components'
import {IntlProviderWrapper} from './locales/api/IntlContext';
import moment from 'moment-timezone';
import conf from 'conf';

const store = configStore();
store.runSaga(rootSaga);

// NOTICE: Moment - Timezone
// NOTE: Timezone https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// console.log(conf);
moment.tz.setDefault(conf.timezone);
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

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
