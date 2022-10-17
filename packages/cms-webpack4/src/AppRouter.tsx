import {useDispatch, useSelector} from "react-redux";
import {selectSearchParams, setSearchParams} from "./modules/shared/utils/searchParamsSlice";
import React, {useEffect} from "react";
import {ConfigProvider} from "antd";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import IndexPage from "./modules/shared/components/IndexPage";
import MerchantPage from "./modules/merchant/components/MerchantPage";
import ProductPage from "./modules/product/components/ProductPage";
import UserPage from "./modules/user/components/UserPage";
import {RiskSettingPage} from "./modules/risk/components/pages/RiskSettingPage";
import UserInfoPage from "./modules/userInfo/components/UserInfoPage";
import {createHashHistory} from "history";
import {ChannelTagPage} from "./modules/channel/components/pages/ChannelTagPage";

const Basename = window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/';

const history = createHashHistory({
    basename: Basename,
})

export const AppRouter = () => {
    const {pathname,previousPathname} = useSelector(selectSearchParams);
    const dispatch = useDispatch();
    useEffect(() => {
        // Listen for changes to the current location.
        const unlisten = history.listen((location, action) => {

            if (location.pathname.indexOf(pathname) + location.pathname.indexOf(previousPathname) <= -2) {
                dispatch(setSearchParams({}));
            }

        })
        return () => {
            unlisten();
        }
    })

    return (
        <ConfigProvider prefixCls="ant4">
            {/* NOTICE: [Its instance type 'BrowserRouter' is not a valid JSX element](https://stackoverflow.com/questions/71843747/its-instance-type-browserrouter-is-not-a-valid-jsx-element)*/}
            {/*<Router basename={window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/'}>*/}
            {/*// @ts-ignore*/}
            <Router basename={Basename} history={history}>
                {/*// @ts-ignore*/}
                <Switch>
                    {/*// @ts-ignore*/}
                    <Route exact path="/" component={IndexPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/merchant" component={MerchantPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/product" component={ProductPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/user" component={UserPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/risk-setting" component={RiskSettingPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/channel-tag" component={ChannelTagPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/user-info/:userId" component={UserInfoPage} />
                </Switch>
            </Router>

        </ConfigProvider>
    )
}
