import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://cf9c82eab5004dd492404928f531e5ca@o4504354754985984.ingest.sentry.io/4504354755969024",
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


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
// NOTE: Epoch Converter https://www.epochconverter.com/
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
                                {/*NOTICE: MainLayout 會拿到 AuthRoute 給的 props.list*/}
                                <MainLayout/>
                            </AuthRoute>
                        </Switch>
                    </Router>
                </IntlProviderWrapper>

            </Provider>
        );
    }
}
