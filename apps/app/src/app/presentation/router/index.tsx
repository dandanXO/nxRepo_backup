import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

// NOTE: Dynamic imports are only supported when the '--module' flag is
//  set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', or 'nodenext'.
import loadable from '@loadable/component';

// NOTE: Page
import { CategoryPage } from '../pages/__test__/CategoryPage';
import { ErrorPage } from '../pages/__test__/ErrorPage';

// const IndexPage = loadable(() => import("../pages/IndexPage"));
import IndexPage from '../pages/IndexPage';
import { useSelector } from 'react-redux';
import { TabBar } from '../components/layouts/TabBar';
import { RootState } from '../../reduxStore';
import { PagePathEnum } from '../pages/PagePathEnum';
import AppDataCollector from '../../modules/dataCollectorContainer/AppDataCollector';
import {NativeAppInfo} from "../../persistant/nativeAppInfo";

const AuthPage = loadable(
  () => import(/* webpackChunkName: "AuthPage" */ '../pages/AuthPage')
);
const BankCardListPage = loadable(
  () =>
    import(
      /* webpackChunkName: "BankCardListPage" */ '../pages/BankCardListPage'
    )
);
const BindBankCardPage = loadable(
  () =>
    import(
      /* webpackChunkName: "BindBankCardPage" */ '../pages/BindBankCardPage'
    )
);
const CustomerServicePage = loadable(
  () =>
    import(
      /* webpackChunkName: "CustomerServicePage" */ '../pages/CustomerServicePage'
    )
);
const DisclosureStatementPage = loadable(
  () =>
    import(
      /* webpackChunkName: "DisclosureStatementPage" */ '../pages/DisclosureStatementPage'
    )
);
const FinishedRepaymentPage = loadable(
  () =>
    import(
      /* webpackChunkName: "FinishedRepaymentPage" */ '../pages/FinishedRepaymentPage'
    )
);
const RepaymentDetailPage = loadable(
  () =>
    import(
      /* webpackChunkName: "RepaymentDetailPage" */ '../pages/RepaymentDetailPage'
    )
);
const LoanRecordPage = loadable(
  () => import(/* webpackChunkName: "RepaymentPage" */ '../pages/RepaymentPage')
);
const OrderStatusPage = loadable(
  () =>
    import(/* webpackChunkName: "OrderStatusPage" */ '../pages/OrderStatusPage')
);
const MyCouponListPage = loadable(
  () =>
    import(
      /* webpackChunkName: "MyCouponListPage" */ '../pages/MyCouponListPage'
    )
);
// const MyCouponPage = loadable(() => import("../pages/MyCouponPage"));
const OnlineCustomerServicePage = loadable(
  () =>
    import(
      /* webpackChunkName: "OnlineCustomerServicePage" */ '../pages/OnlineCustomerServicePage'
    )
);
const IBANFinderPage = loadable(
  () =>
    import(/* webpackChunkName: "IBANFinderPage" */ '../pages/IBANFinderPage')
);

const PartnerPage = loadable(
  () => import(/* webpackChunkName: "PartnerPage" */ '../pages/PartnerPage')
);
const PersonalInfoPage = loadable(
  () =>
    import(
      /* webpackChunkName: "PersonalInfoPage" */ '../pages/PersonalInfoPage'
    )
);
const PrivacyPolicyPage = loadable(
  () =>
    import(
      /* webpackChunkName: "PrivacyPolicyPage" */ '../pages/PrivacyPolicyPage'
    )
);
const QuotaModelPage = loadable(
  () =>
    import(/* webpackChunkName: "QuotaModelPage" */ '../pages/QuotaModelPage')
);
const UploadedPaymentReceiptPage = loadable(
  () =>
    import(
      /* webpackChunkName: "UploadedPaymentReceiptPage" */ '../pages/UploadedPaymentReceiptPage'
    )
);
const UploadPaymentReceiptPage = loadable(
  () =>
    import(
      /* webpackChunkName: "UploadPaymentReceiptPage" */ '../pages/UploadPaymentReceiptPage'
    )
);
const CouponModalContentAndroidWebviewPage = loadable(
  () =>
    import(
      /* webpackChunkName: "CouponModalContentAndroidWebviewPage" */ '../pages/CouponModalContentAndroidWebviewPage'
    )
);

const ApplicationProgressPage = loadable(
  () =>
    import(
      /* webpackChunkName: "ApplicationProgressPage" */ '../pages/ApplicationProgressPage'
    )
);
const LoginPage = loadable(
  () => import(/* webpackChunkName: "LoginPage" */ '../pages/LoginPage')
);

// // NOTE: Modal
const RepaymentModal = loadable(
  () =>
    import(/* webpackChunkName: "RepaymentModal" */ '../modals/RepaymentModal')
);
const AmountRepaidModal = loadable(
  () =>
    import(
      /* webpackChunkName: "AmountRepaidModal" */ '../modals/AmountRepaidModal/AmountRepaidModal'
    )
);
const ExtendConfirmModal = loadable(
  () =>
    import(
      /* webpackChunkName: "ExtendConfirmModal" */ '../modals/ExtendConfirmModal'
    )
);
const ExtendModal = loadable(
  () => import(/* webpackChunkName: "ExtendModal" */ '../modals/ExtendModal')
);
const LogoutModal = loadable(
  () => import(/* webpackChunkName: "LogoutModal" */ '../modals/LogoutModal')
);
const APIBoundaryModal = loadable(
  () =>
    import(
      /* webpackChunkName: "APIBoundaryModal" */ '../modals/APIBoundaryModal'
    )
);
const PrivacyPolicyModal = loadable(
  () =>
    import(
      /* webpackChunkName: "PrivacyPolicyModal" */ '../modals/PrivacyPolicyModal'
    )
);
const RepamentCouponModal = loadable(
  () =>
    import(
      /* webpackChunkName: "RepamentCouponModal" */ '../modals/RepamentCouponModal'
    )
);
const IBANFinderModal = loadable(
  () =>
    import(
      /* webpackChunkName: "IBANFinderModal" */ '../modals/IBANFinderModal'
    )
);

export const AppRouter = () => {
  const isInit: boolean = useSelector(
    (state: RootState) => state.app.isInit
  );

  const location = useLocation();
  const apiBoundary = useSelector(
    (state: RootState) => state.APIBoundaryModule
  );
  const payableRecords = useSelector(
    (state: RootState) => state.indexPage.indexAPI?.payableRecords
  );

  // NOTICE: 純 H5 在用畫面阻擋
  // if(NativeAppInfo.mode === 'H5' && !isInit) {
    // if(!isInit) {
      // return <div>APP initialized wrongly</div>
      // return <div>H5 mode is initializing</div>
    // }
  // }


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
        <Route
          path={PagePathEnum.PrivacyPolicyModal}
          element={<PrivacyPolicyModal />}
        />
        <Route
          path={PagePathEnum.ApplicationProgressPage}
          element={<ApplicationProgressPage />}
        />
        <Route path="/v2/auth" element={<AuthPage />} />
        <Route
          path={PagePathEnum.BankcardListPage}
          element={<BankCardListPage />}
        />
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}>
          <Route path="iban-finder-modal" element={<IBANFinderModal />} />
        </Route>
        <Route
          path={PagePathEnum.CustomerServicePage}
          element={<CustomerServicePage />}
        />
        <Route
          path="/v2/online-customer-service"
          element={<OnlineCustomerServicePage />}
        />
        <Route
          path={PagePathEnum.DisclosureStatementPage}
          element={<DisclosureStatementPage />}
        />

        <Route
          path="/v2/finished-repayment"
          element={<FinishedRepaymentPage />}
        />

        <Route
          path={PagePathEnum.RepaymentDetailPage}
          element={<RepaymentDetailPage />}
        >
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route
            path="amount-repaid-record-modal"
            element={<AmountRepaidModal />}
          />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route
            path="repayment-coupon-modal"
            element={<RepamentCouponModal />}
          />
        </Route>

        <Route path={PagePathEnum.RepaymentPage} element={<LoanRecordPage />} />
        <Route path="/v2/my-coupon-list" element={<MyCouponListPage />} />
        <Route path="/v2/partner" element={<PartnerPage />} />
        <Route
          path={PagePathEnum.PersonalInfoPage}
          element={<PersonalInfoPage />}
        >
          <Route path="log-out-modal" element={<LogoutModal />} />
        </Route>
        <Route
          path={PagePathEnum.OrderStatusPage}
          element={<OrderStatusPage />}
        />
        <Route
          path={PagePathEnum.PrivacyPolicyPage}
          element={<PrivacyPolicyPage />}
        />
        <Route path="/v2/quota-model" element={<QuotaModelPage />} />
        <Route
          path="/v2/uploaded-payment-receipt"
          element={<UploadedPaymentReceiptPage />}
        />
        <Route
          path="/v2/upload-payment-receipt"
          element={<UploadPaymentReceiptPage />}
        />
        {/*<Route path="/log-out-modal" element={<LogoutModal />} />*/}

        <Route
          path="/v2/coupon-modal-content"
          element={<CouponModalContentAndroidWebviewPage />}
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {/*<Page>*/}
      {/*  prevent empty page*/}
      {/*</Page>*/}

      {[
        PagePathEnum.IndexPage as string,
        PagePathEnum.RepaymentPage as string,
        PagePathEnum.PersonalInfoPage as string,
      ].indexOf(location.pathname) > -1 && (
        <TabBar
          hasOrder={payableRecords ? payableRecords?.length > 0 : false}
        />
      )}

      {apiBoundary.show && (
        <APIBoundaryModal
          title={apiBoundary.title}
          message={apiBoundary.message}
        />
      )}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};
