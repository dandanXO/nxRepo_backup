import { ConfigProvider } from 'antd';
// eslint-disable-next-line camelcase
import en_US from 'antd/es/locale/en_US';
// eslint-disable-next-line camelcase
import zh_CN from 'antd/es/locale/zh_CN';
import { createHashHistory } from 'history';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import { AfterLoanManageRoutes } from './modules/afterLoanManage/routes';
import { AppManagePage } from './modules/app/components/pages/AppManagePage';
import { ChannelTabPage } from './modules/channel/components/pages/ChannelTabPage';
import { OverdueDistributionPage } from './modules/distribution/pages/OverdueDistributionPage';
import { TodayDistributionPage } from './modules/distribution/pages/TodayDistributionPage';
import { ActivityAdsAdminPage } from './modules/diversion/ads/components/pages/ActivityAdsPage/ActivityAdsAdminPage';
import PayReceiptPage from './modules/financial/components/PayReceiptPage';
import OrderDetailPage from './modules/order/components/OrderDetailPage';
import OrderFinalReviewDetailPage from './modules/order/components/OrderFinalReviewDetailPage';
import OrderFinalReviewPage from './modules/order/components/OrderFinalReviewPage';
import OrderPage from './modules/order/components/OrderPage';
import OrderReviewDetailPage from './modules/order/components/OrderReviewDetailPage';
import OrderReviewPage from './modules/order/components/OrderReviewPage';
import OrderReviewRecordPage from './modules/order/components/OrderReviewRecordPage';
import { MerchantPage } from './modules/product/components/pages/MerchantPage';
import { ProductPage } from './modules/product/components/pages/ProductPage';
import { RiskSettingPage } from './modules/risk/components/pages/RiskSettingPage';
import IndexPage from './modules/shared/components/pages/IndexPage';
import { selectSearchParams, setSearchParams, setSelectedRow } from './modules/shared/utils/searchParamsSlice';
import SmsConfigPage from './modules/sms/components/pages/SmsConfigPage';
import DailyRiskControlPage from './modules/statistics/components/pages/DailyRiskControlPage';
import { NewCustomerRiskControlRepaymentRatePage } from './modules/statistics/components/pages/NewCustomerRiskControlRepaymentRatePage';
import NewCustomersDailyConversionRatesPage from './modules/statistics/components/pages/NewCustomersDailyConversionRatesPage';
import ReloanStatisticsPage from './modules/statistics/components/pages/ReloanStatisticsPage';
import ConfigManagePage from './modules/system/components/pages/ConfigManagePage';
import LoginAccountManagePage from './modules/system/components/pages/LoginAccountManage';
import { TodayLoanManageRoutes } from './modules/todayLoanManage/routes';
import BlackListPage from './modules/user/components/pages/BlackListPage';
import UserInfoPage from './modules/user/components/pages/UserInfoPage';
import UserPage from './modules/user/components/pages/UserPage';
import UserReviewInfoPage from './modules/user/components/pages/UserReviewInfoPage';
import UserReviewPage from './modules/user/components/pages/UserReviewPage';
import UserReviewRecordPage from './modules/user/components/pages/UserReviewRecordPage';
import WhiteListPage from './modules/user/components/pages/WhiteListPage';

const langMap = {
    // eslint-disable-next-line camelcase
    'zh-CN': zh_CN,
    // eslint-disable-next-line camelcase
    'en-US': en_US,
};

const Basename = window['__POWERED_BY_QIANKUN__'] ? '/cms' : '/';

const history = createHashHistory({
    basename: Basename,
});

export const AppRouter = (): JSX.Element => {
    const { pathname, previousPathname } = useSelector(selectSearchParams);
    // eslint-disable-next-line no-empty-pattern
    const {} = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        // Listen for changes to the current location.
        const unlisten = history.listen((location) => {
            if (location.pathname.indexOf(pathname) + location.pathname.indexOf(previousPathname) <= -2) {
                dispatch(setSearchParams({}));
                dispatch(setSelectedRow([]));
            }
        });
        return () => {
            unlisten();
        };
    });

    return (
        <ConfigProvider prefixCls="ant4" locale={langMap[i18next.language]}>
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
                    <Route path={'/user-review-record'} component={UserReviewRecordPage} />
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
                    <Route
                        path="/order-final-review-detail/:userId/:orderId/:orderNo"
                        component={OrderFinalReviewDetailPage}
                    />
                    {/*// @ts-ignore*/}
                    <Route path="/order-review-record" component={OrderReviewRecordPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/activity-ads'} component={ActivityAdsAdminPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/sms-config'} component={SmsConfigPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/pay-receipt'} component={PayReceiptPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/riskControlStatistic'} component={DailyRiskControlPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/today-distribution'} component={TodayDistributionPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/overdue-distribution'} component={OverdueDistributionPage} />

                    {/*// @ts-ignore*/}
                    <Route path={'/new-customer-repayment-rate'} component={NewCustomerRiskControlRepaymentRatePage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/loginAccountMange'} component={LoginAccountManagePage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/Registrations'} component={NewCustomersDailyConversionRatesPage} />
                    {/*// @ts-ignore*/}
                    <Route path={'/reloanStatistics'} component={ReloanStatisticsPage} />
                </Switch>

                {/*逾期催收*/}
                <AfterLoanManageRoutes />

                {/*當日催收*/}
                <TodayLoanManageRoutes />
            </Router>
        </ConfigProvider>
    );
};
