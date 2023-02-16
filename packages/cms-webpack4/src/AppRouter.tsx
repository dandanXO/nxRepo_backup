import {useDispatch, useSelector} from "react-redux";
import {selectSearchParams, setSearchParams,setSelectedRow} from "./modules/shared/utils/searchParamsSlice";
import React, {useEffect} from "react";
import {ConfigProvider} from "antd";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import IndexPage from "./modules/shared/components/pages/IndexPage";
import {MerchantPage} from "./modules/product/components/pages/MerchantPage";
import {ProductPage} from "./modules/product/components/pages/ProductPage";
import UserPage from "./modules/user/components/pages/UserPage";
import {RiskSettingPage} from "./modules/risk/components/pages/RiskSettingPage";
import UserInfoPage from "./modules/user/components/pages/UserInfoPage";
import {createHashHistory} from "history";
import {ChannelTabPage} from "./modules/channel/components/pages/ChannelTabPage";
import UserReviewPage from "./modules/user/components/pages/UserReviewPage";
import UserReviewInfoPage from "./modules/user/components/pages/UserReviewInfoPage";
import UserReviewRecordPage from "./modules/user/components/pages/UserReviewRecordPage";
import WhiteListPage from "./modules/user/components/pages/WhiteListPage";
import BlackListPage from "./modules/user/components/pages/BlackListPage";
import {AppManagePage} from "./modules/app/components/pages/AppManagePage";
import ConfigManagePage from "./modules/system/components/pages/ConfigManagePage";
import OrderPage from "./modules/order/components/OrderPage";
import OrderDetailPage from "./modules/order/components/OrderDetailPage";
import OrderReviewPage from "./modules/order/components/OrderReviewPage";
import OrderReviewDetailPage from "./modules/order/components/OrderReviewDetailPage";
import OrderFinalReviewPage from "./modules/order/components/OrderFinalReviewPage";
import OrderFinalReviewDetailPage from "./modules/order/components/OrderFinalReviewDetailPage";
import OrderReviewRecordPage from "./modules/order/components/OrderReviewRecordPage";
import SmsConfigPage from "./modules/sms/components/pages/SmsConfigPage";
import {ActivityAdsAdminPage} from "./modules/diversion/ads/components/pages/ActivityAdsPage/ActivityAdsAdminPage";
import PayReceiptPage from "./modules/financial/components/PayReceiptPage";
import DailyRiskControlPage from "./modules/statistics/components/pages/DailyRiskControlPage"
import {TodayDistributionPage} from "./modules/distribution/pages/TodayDistributionPage";
import {OverdueDistributionPage} from "./modules/distribution/pages/OverdueDistributionPage";
import {
    NewCustomerRiskControlRepaymentRatePage
} from "./modules/statistics/components/pages/NewCustomerRiskControlRepaymentRatePage";
import LoginAccountManagePage from "./modules/system/components/pages/LoginAccountManage";
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
                dispatch(setSelectedRow([]))
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
                    {/*<Route path="/risk-setting" component={RiskSettingPage} />*/}
                    {/*// @ts-ignore*/}
                    <Route path="/risk-setting" component={RiskSettingPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/channel" component={ChannelTabPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/user-info/:userId" component={UserInfoPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/user-review" component={UserReviewPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/user-review-info/:userId" component={UserReviewInfoPage} />
                    {/*// @ts-ignore*/}
                    <Route path={"/user-review-record"} component={UserReviewRecordPage}/>
                    {/*// @ts-ignore*/}
                    <Route path="/whitelist" component={WhiteListPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/blacklist" component={BlackListPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/app-manage" component={AppManagePage} />
                    {/*// @ts-ignore*/}
                    <Route path="/config-manage" component={ConfigManagePage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order" component={OrderPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order-detail/:userId/:orderId/:orderNo" component={OrderDetailPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order-review" component={OrderReviewPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order-review-detail/:userId/:orderId/:orderNo" component={OrderReviewDetailPage} />
                    {/*// @ts-ignore*/}
                     {/*// @ts-ignore*/}
                    <Route path="/order-final-review" component={OrderFinalReviewPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order-final-review-detail/:userId/:orderId/:orderNo" component={OrderFinalReviewDetailPage} />
                    {/*// @ts-ignore*/}
                    <Route path="/order-review-record" component={OrderReviewRecordPage} />
                    {/*// @ts-ignore*/}
                    <Route path={"/activity-ads"} component={ActivityAdsAdminPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/sms-config"} component={SmsConfigPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/pay-receipt"} component={PayReceiptPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/riskControlStatistic"} component={DailyRiskControlPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/today-distribution"} component={TodayDistributionPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/overdue-distribution"} component={OverdueDistributionPage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/statistics/new-customer-repayment-rate"} component={NewCustomerRiskControlRepaymentRatePage}/>
                    {/*// @ts-ignore*/}
                    <Route path={"/loginAccountMange"} component={LoginAccountManagePage}/>
                </Switch>
            </Router>

        </ConfigProvider>
    )
}
