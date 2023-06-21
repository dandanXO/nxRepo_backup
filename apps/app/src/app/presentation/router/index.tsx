// NOTE: Dynamic imports are only supported when the '--module' flag is
//  set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', or 'nodenext'.
// import loadableComponent from '@loadable/component';
import posthog from 'posthog-js';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router';

import AppDataCollector from '../../modules/dataCollectorContainer/AppDataCollector';
import { RootState } from '../../reduxStore';
import { TabBar } from '../components/layouts/TabBar';
// const IndexPage = loadable(() => import("../pages/IndexPage"));
import IndexPage from '../pages/IndexPage';
import { PagePathEnum } from '../pages/PagePathEnum';

// NOTE: Page
import { CategoryPage } from '../pages/__test__/CategoryPage';
import { ErrorPage } from '../pages/__test__/ErrorPage';

// NOTICE: 無法以下寫法
// [ctor is not a function when using React.lazy](https://github.com/facebook/react/issues/15639)
// const loadable = React.lazy ||loadableComponent;

const AuthPage = React.lazy(() => import(/* webpackChunkName: "AuthPage" */ '../pages/AuthPage'));
const BankCardListPage = React.lazy(() => import(/* webpackChunkName: "BankCardListPage" */ '../pages/BankCardListPage'));
const BindBankCardPage = React.lazy(() => import(/* webpackChunkName: "BindBankCardPage" */ /* webpackPrefetch: true */'../pages/BindBankCardPage'));
const CustomerServicePage = React.lazy(
  () => import(/* webpackChunkName: "CustomerServicePage" */ '../pages/CustomerServicePage')
);
const DisclosureStatementPage = React.lazy(
  () => import(/* webpackChunkName: "DisclosureStatementPage" */ '../pages/DisclosureStatementPage')
);
const FinishedRepaymentPage = React.lazy(
  () => import(/* webpackChunkName: "FinishedRepaymentPage" */ '../pages/FinishedRepaymentPage')
);
const RepaymentDetailPage = React.lazy(
  () => import(/* webpackChunkName: "RepaymentDetailPage" */ /* webpackPrefetch: true */ '../pages/RepaymentDetailPage')
);
const LoanRecordPage = React.lazy(() => import(/* webpackChunkName: "RepaymentPage" */ '../pages/RepaymentPage'));
const OrderStatusPage = React.lazy(() => import(/* webpackChunkName: "OrderStatusPage" */ '../pages/OrderStatusPage'));
const MyCouponListPage = React.lazy(() => import(/* webpackChunkName: "MyCouponListPage" */ '../pages/MyCouponListPage'));
const OnlineCustomerServicePage = React.lazy(
  () => import(/* webpackChunkName: "OnlineCustomerServicePage" */ '../pages/OnlineCustomerServicePage')
);
const IBANFinderPage = React.lazy(() => import(/* webpackChunkName: "IBANFinderPage" */ '../pages/IBANFinderPage'));

const PartnerPage = React.lazy(() => import(/* webpackChunkName: "PartnerPage" */ '../pages/PartnerPage'));
const PersonalInfoPage = React.lazy(() => import(/* webpackChunkName: "PersonalInfoPage" */ '../pages/PersonalInfoPage'));
const PrivacyPolicyPage = React.lazy(
  () => import(/* webpackChunkName: "PrivacyPolicyPage" */ '../pages/PrivacyPolicyPage')
);
const QuotaModelPage = React.lazy(() => import(/* webpackChunkName: "QuotaModelPage" */ '../pages/QuotaModelPage'));
const UploadedPaymentReceiptPage = React.lazy(
  () => import(/* webpackChunkName: "UploadedPaymentReceiptPage" */ /* webpackPrefetch: true */ '../pages/UploadedPaymentReceiptPage')
);
const UploadPaymentReceiptPage = React.lazy(
  () => import(/* webpackChunkName: "UploadPaymentReceiptPage" */ /* webpackPrefetch: true */ '../pages/UploadPaymentReceiptPage')
);
const CouponModalContentAndroidWebviewPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "CouponModalContentAndroidWebviewPage" */ /* webpackPrefetch: true */ '../pages/CouponModalContentAndroidWebviewPage'
    )
);

const ApplicationProgressPage = React.lazy(
  () => import(/* webpackChunkName: "ApplicationProgressPage" */ '../pages/ApplicationProgressPage')
);
const LoginPage = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/LoginPage'));

// // NOTE: Modal
const RepaymentModal = React.lazy(() => import(/* webpackChunkName: "RepaymentModal" */ /* webpackPrefetch: true */ '../modals/RepaymentModal'));
const AmountRepaidModal = React.lazy(
  () => import(/* webpackChunkName: "AmountRepaidModal" */ /* webpackPrefetch: true */ '../modals/AmountRepaidModal/AmountRepaidModal')
);
const ExtendConfirmModal = React.lazy(
  () => import(/* webpackChunkName: "ExtendConfirmModal" */ /* webpackPrefetch: true */ '../modals/ExtendConfirmModal')
);
const ExtendModal = React.lazy(() => import(/* webpackChunkName: "ExtendModal" */ /* webpackPrefetch: true */ '../modals/ExtendModal'));
const LogoutModal = React.lazy(() => import(/* webpackChunkName: "LogoutModal" */ '../modals/LogoutModal'));
const APIBoundaryModal = React.lazy(
  () => import(/* webpackChunkName: "APIBoundaryModal" */ '../modals/APIBoundaryModal')
);
const PrivacyPolicyModal = React.lazy(
  () => import(/* webpackChunkName: "PrivacyPolicyModal" */ '../modals/PrivacyPolicyModal')
);
const RepamentCouponModal = React.lazy(
  () => import(/* webpackChunkName: "RepamentCouponModal" */ /* webpackPrefetch: true */ '../modals/RepamentCouponModal')
);
const IBANFinderModal = React.lazy(() => import(/* webpackChunkName: "IBANFinderModal" */ /* webpackPrefetch: true */ '../modals/IBANFinderModal'));


// NOTICE: prefetch chrome, firefox cannot work
// https://stackoverflow.com/questions/59074046/why-are-my-prefetched-scripts-not-being-used-webpack
// https://stackoverflow.com/questions/64068567/link-prefetch-not-working-properly-script-is-fetched-again-on-navigation/76362114#76362114
// https://www.webhek.com/post/preload-prefetch-and-priorities-in-chrome/
// https://github.com/jantimon/html-webpack-plugin/issues/1317
// https://www.technipages.com/google-chrome-prefetch/


// NOTE: preload
// BindBankCardPage.preload();
// RepaymentDetailPage.preload();
// IBANFinderModal.preload();

// NOTE: 不需要預先加載
// UploadedPaymentReceiptPage.preload();
// UploadPaymentReceiptPage.preload();
// CouponModalContentAndroidWebviewPage.preload();
// RepaymentModal.preload();
// AmountRepaidModal.preload();
// ExtendConfirmModal.preload();
// ExtendModal.preload();
// RepamentCouponModal.preload();




export const AppRouter = () => {
  const isInit: boolean = useSelector((state: RootState) => state.app.isInit);

  const location = useLocation();
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
  const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);
  const isOrderOverdue = payableRecords && payableRecords?.some((order) => order.overdue === true);

  // NOTICE: 純 H5 在用畫面阻擋
  // if(NativeAppInfo.mode === 'H5' && !isInit) {
  // if(!isInit) {
  // return <div>APP initialized wrongly</div>
  // return <div>H5 mode is initializing</div>
  // }
  // }

  React.useEffect(() => {
    // new
    posthog.capture('$pageview');
  }, [location]);

  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
        <Route path="/v2/category" element={<CategoryPage />} />
        <Route path="/v2/error" element={<ErrorPage />} />
        <Route path={PagePathEnum.LoginPage} element={<LoginPage />}>
          <Route path="log-out-modal" element={<LogoutModal />} />
        </Route>
        <Route path={PagePathEnum.IBANFinderPage} element={<IBANFinderPage />} />
        <Route path={PagePathEnum.IndexPage} element={<IndexPage />} />
        <Route path={PagePathEnum.PrivacyPolicyModal} element={<PrivacyPolicyModal />} />
        <Route path={PagePathEnum.ApplicationProgressPage} element={<ApplicationProgressPage />} />
        <Route path="/v2/auth" element={<AuthPage />} />
        <Route path={PagePathEnum.BankcardListPage} element={<BankCardListPage />} />
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}>
          <Route path="iban-finder-modal" element={<IBANFinderModal />} />
        </Route>
        <Route path={PagePathEnum.CustomerServicePage} element={<CustomerServicePage />} />
        <Route path="/v2/online-customer-service" element={<OnlineCustomerServicePage />} />
        <Route path={PagePathEnum.DisclosureStatementPage} element={<DisclosureStatementPage />} />

        <Route path="/v2/finished-repayment" element={<FinishedRepaymentPage />} />

        <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>

        <Route path={PagePathEnum.RepaymentPage} element={<LoanRecordPage />} />
        <Route path={PagePathEnum.MyCouponListPage} element={<MyCouponListPage />} />
        <Route path="/v2/partner" element={<PartnerPage />} />
        <Route path={PagePathEnum.PersonalInfoPage} element={<PersonalInfoPage />}>
          <Route path="log-out-modal" element={<LogoutModal />} />
        </Route>
        <Route path={PagePathEnum.OrderStatusPage} element={<OrderStatusPage />} />
        <Route path={PagePathEnum.PrivacyPolicyPage} element={<PrivacyPolicyPage />} />
        <Route path="/v2/quota-model" element={<QuotaModelPage />} />
        <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
        <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
        {/*<Route path="/log-out-modal" element={<LogoutModal />} />*/}

        <Route path="/v2/coupon-modal-content" element={<CouponModalContentAndroidWebviewPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {/*<Page>*/}
      {/*  prevent empty page*/}
      {/*</Page>*/}

      {/*TODO: refactor me*/}
      {[
        PagePathEnum.IndexPage as string,
        PagePathEnum.RepaymentPage as string,
        PagePathEnum.PersonalInfoPage as string,
        PagePathEnum.PersonalInfoPage + '/log-out-modal',
       ].indexOf(location.pathname) > -1 && <TabBar hasOrder={isOrderOverdue ?? false} />}

      {apiBoundary.show && <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message} />}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};
