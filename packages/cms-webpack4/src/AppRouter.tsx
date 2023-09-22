import { ConfigProvider } from 'antd';
// eslint-disable-next-line camelcase
import en_US from 'antd/es/locale/en_US';
// eslint-disable-next-line camelcase
import zh_CN from 'antd/es/locale/zh_CN';
import es_ES from 'antd/es/locale/es_ES'
import { createHashHistory } from 'history';
import i18next from 'i18next';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import IndexPage from './modules/shared/components/pages/IndexPage';
import { selectSearchParams, setSearchParams } from './modules/shared/utils/searchParamsSlice';
import routes from './routes';

const langMap = {
    // eslint-disable-next-line camelcase
    'zh-CN': zh_CN,
    // eslint-disable-next-line camelcase
    'en-US': en_US,
    // eslint-disable-next-line camelcase
    'es-ES': es_ES,
};

const Basename = window['__POWERED_BY_QIANKUN__'] ? '/cms' : '/';

const history = createHashHistory({
    basename: Basename,
});

export const AppRouter = (): JSX.Element => {
    const { pathname, nextPathname } = useSelector(selectSearchParams);
    // eslint-disable-next-line no-empty-pattern
    const {} = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        // Listen for changes to the current location.
        const unListen = history.listen((location) => {
            if (location.pathname.indexOf(pathname) + location.pathname.indexOf(nextPathname) <= -2) {
                dispatch(setSearchParams({}));
            }
        });
        return () => {
            unListen();
        };
    });

    return (
        <ConfigProvider prefixCls="ant4" locale={langMap[i18next.language]}>
            {/* NOTICE: [Its instance type 'BrowserRouter' is not a valid JSX element](https://stackoverflow.com/questions/71843747/its-instance-type-browserrouter-is-not-a-valid-jsx-element)*/}
            {/*<Router basename={window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/'}>*/}
            {/*// @ts-ignore*/}
            <Router basename={Basename} history={history}>
                <Suspense fallback={<div></div>}>
                    <Switch>
                        <Route exact path="/" component={IndexPage} />
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                render={(props) => <route.component {...props} routes={route.routes} />}
                            />
                        ))}
                    </Switch>
                </Suspense>
            </Router>
        </ConfigProvider>
    );
};
