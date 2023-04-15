import React, {Suspense} from "react";
import {Route, Routes, useLocation,} from "react-router";

// NOTE: Dynamic imports are only supported when the '--module' flag is
//  set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', or 'nodenext'.
import loadable from '@loadable/component'

// NOTE: Page
import {CategoryPage} from "../pages/__test__/CategoryPage";
import {ErrorPage} from "../pages/__test__/ErrorPage";

// const IndexPage = loadable(() => import("../pages/IndexPage"));
import IndexPage from "../pages/IndexPage";
const AuthPage = loadable(() => import("../pages/AuthPage"));
const BankCardListPage = loadable(() => import("../pages/BankCardListPage"));
const BindBankCardPage = loadable(() => import("../pages/BindBankCardPage"));
const CustomerServicePage = loadable(() => import("../pages/CustomerServicePage"));
const DisclosureStatementPage = loadable(() => import("../pages/DisclosureStatementPage"));
const ExtendDetailsPage = loadable(() => import("../pages/ExtendDetailsPage"));
const FinishedRepaymentPage = loadable(() => import("../pages/FinishedRepaymentPage"));
const RepaymentDetailPage = loadable(() => import("../pages/RepaymentDetailPage"));
const LoanRecordPage = loadable(() => import("../pages/RepaymentPage"));
const MyCouponListPage = loadable(() => import("../pages/MyCouponListPage"));
const MyCouponPage = loadable(() => import("../pages/MyCouponPage"));
const PartnerPage = loadable(() => import("../pages/PartnerPage"));
const PersonalInfoPage = loadable(() => import("../pages/PersonalInfoPage"));
const PrivacyPolicyPage = loadable(() => import("../pages/PrivacyPolicyPage"));
const QuotaModelPage = loadable(() => import("../pages/QuotaModelPage"));
const UploadedPaymentReceiptPage = loadable(() => import("../pages/UploadedPaymentReceiptPage"));
const UploadPaymentReceiptPage = loadable(() => import("../pages/UploadPaymentReceiptPage"));
const ApplicationProgressPage = loadable(() => import("../pages/ApplicationProgressPage"));
const LoginPage = loadable(() => import('../pages/LoginPage'));

// NOTE: Modal
const RepaymentModal = loadable(() => import('../modals/RepaymentModal'));
const AmountRepaidModal = loadable(() => import("../modals/AmountRepaidModal/AmountRepaidModal"));
const ExtendConfirmModal = loadable(() => import("../modals/ExtendConfirmModal"));
const ExtendModal = loadable(() => import("../modals/ExtendModal/ExtendModal"));
const CustomerServiceModal = loadable(() => import("../modals/CustomerServiceModal"));
const LogoutModal = loadable(() => import("../modals/LogoutModal"));
const APIBoundaryModal = loadable(() => import("../modals/APIBoundaryModal"));
const PrivacyPolicyModal = loadable(() => import("../modals/PrivacyPolicyModal"));

import { useSelector } from "react-redux"
import {TabBar} from "../components/layouts/TabBar";
import {RootState} from "../../usecaseFlow/reduxStore";
import {PagePathEnum} from "../pages/PagePathEnum";


export const AppRouter = () => {
  const location = useLocation();
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
  const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);

  return (
    <>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
        <Routes>
          <Route path="/v2/category" element={<CategoryPage />} />
          <Route path="/v2/error" element={<ErrorPage />} />
          <Route path="/v2" element={<IndexPage />} />
          <Route path="/v2/login" element={<LoginPage />} >
            <Route path="log-out-modal" element={<LogoutModal />} />
          </Route>
          <Route path="/v2/privacy-policy-modal" element={<PrivacyPolicyModal />} />
          <Route path="/v2/application-progress" element={<ApplicationProgressPage />} />
          <Route path="/v2/auth" element={<AuthPage />} />
          <Route path="/v2/bankcard-list" element={<BankCardListPage />} />
          <Route path="/v2/bind-bankcard" element={<BindBankCardPage />} />
          <Route path="/v2/customer-service" element={<CustomerServicePage />} >
            <Route path="customer-service-modal" element={<CustomerServiceModal />} />
          </Route>
          <Route path="/v2/disclosure-statement" element={<DisclosureStatementPage />} />
          <Route path="/v2/extend-details" element={<ExtendDetailsPage />} />
          <Route path="/v2/finished-repayment" element={<FinishedRepaymentPage />} />

          <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
            <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
            <Route path="extend-modal" element={<ExtendModal />} />
            <Route path="repayment-modal" element={<RepaymentModal />} />
            <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          </Route>
          <Route path={PagePathEnum.RepaymentPage} element={<LoanRecordPage />} />
          <Route path="/v2/my-coupon-list" element={<MyCouponListPage />} />
          <Route path="/v2/mu-coupon" element={<MyCouponPage />} />
          <Route path="/v2/partner" element={<PartnerPage />} />
          <Route path={PagePathEnum.PersonalInfoPage} element={<PersonalInfoPage />} >
            <Route path="log-out-modal" element={<LogoutModal />} />
          </Route>
          <Route path="/v2/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/v2/quota-model" element={<QuotaModelPage />} />
          <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
          <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
          {/*<Route path="/log-out-modal" element={<LogoutModal />} />*/}
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
          <TabBar hasOrder={payableRecords ? payableRecords?.length > 0 : false}/>
        )}

        {apiBoundary.show && (
          <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message}/>
        )}
      {/*</Suspense>*/}
    </>
  );
};


export const OuterRouter = () => {
  const location = useLocation();
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
  console.log("apiBoundary", apiBoundary)
  const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);

  return (
    <div>
      {
        // [
        //   "/",
        //   "/loan-record",
        //   "/personal-info"
        // ].indexOf(location.pathname) > -1 && (
        //   <TabBar hasOrder={payableRecords ? payableRecords?.length > 0 : false}/>
        // )
      }
      <TabBar hasOrder={payableRecords ? payableRecords?.length > 0 : false}/>

      {apiBoundary.show && (
        <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message}/>
      )}
    </div>
  )
}

// export const appRouterV2 = createBrowserRouter([
//   // {
//   //   path: "*",
//   //   element: <OuterRouter />,
//   //   // errorElement: <ErrorPage />,
//   // },
//   {
//     path: "/category",
//     element: <CategoryPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "log-out-modal",
//         element: <LogoutModal />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <IndexPage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <OuterRouter />,
//       },
//     ],
//   },
//   {
//     path: "/loan-record",
//     element: <LoanRecordPage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <OuterRouter />,
//       },
//     ]
//   },
//   {
//     path: "repayment-detail",
//     element: <LoanRecordDetailPage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "extend-confirm-modal",
//         element: <ExtendConfirmModal />,
//       },
//       {
//         path: "extend-modal",
//         element: <ExtendModal />,
//       },
//       {
//         path: "repayment-modal",
//         element: <RepaymentModal />,
//       },
//       {
//         path: "amount-repaid-record-modal",
//         element: <AmountRepaidModal />,
//       },
//     ],
//   },
//   {
//     path: "/personal-info",
//     element: <PersonalInfoPage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <OuterRouter />,
//       },
//       {
//         path: "log-out-modal",
//         element: <LogoutModal />,
//       },
//     ],
//   },
//   {
//     path: "/privacy-policy-modal",
//     element: <PrivacyPolicyModal />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/application-progress",
//     element: <ApplicationProgressPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/auth",
//     element: <AuthPage />,
//     // errorElement: <ErrorPage />,
//   },
//
//   {
//     path: "/bankcard-list",
//     element: <BankCardListPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/bind-bankcard",
//     element: <BindBankCardPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/customer-service",
//     element: <CustomerServicePage />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "customer-service-modal",
//         element: <CustomerServiceModal />,
//       },
//     ],
//   },
//   {
//     path: "/disclosure-statement",
//     element: <DisclosureStatementPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/extend-details",
//     element: <ExtendDetailsPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/finished-repayment",
//     element: <FinishedRepaymentPage />,
//     // errorElement: <ErrorPage />,
//   },
//
//
//   {
//     path: "/my-coupon-list",
//     element: <MyCouponListPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/mu-coupon",
//     element: <MyCouponPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/partner",
//     element: <PartnerPage />,
//     // errorElement: <ErrorPage />,
//   },
//
//   {
//     path: "/privacy-policy",
//     element: <PrivacyPolicyPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/quota-model",
//     element: <QuotaModelPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/uploaded-payment-receipt",
//     element: <UploadedPaymentReceiptPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/upload-payment-receipt",
//     element: <UploadPaymentReceiptPage />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/log-out-modal",
//     element: <LogoutModal />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "*",
//     element: <div>Not Found</div>
//   }
// ]);

// export const appRouterV3 = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       {/*<Routes>*/}
//         <Route path="/" element={
//           <Page className={"flex flex-col"}>
//             <IndexPage />
//             {/*<OuterRouter/>*/}
//           </Page>
//         } children={<OuterRouter />}/>
//         <Route path="/category" element={<CategoryPage />} />
//
//         <Route path="/login" element={<LoginPage />} >
//           <Route path="log-out-modal" element={<LogoutModal />} />
//         </Route>
//         <Route path="/privacy-policy-modal" element={<PrivacyPolicyModal />} />
//         <Route path="/application-progress" element={<ApplicationProgressPage />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/bankcard-list" element={<BankCardListPage />} />
//         <Route path="/bind-bankcard" element={<BindBankCardPage />} />
//         <Route path="/customer-service" element={<CustomerServicePage />} >
//           <Route path="customer-service-modal" element={<CustomerServiceModal />} />
//         </Route>
//         <Route path="/disclosure-statement" element={<DisclosureStatementPage />} />
//         <Route path="/extend-details" element={<ExtendDetailsPage />} />
//         <Route path="/finished-repayment" element={<FinishedRepaymentPage />} />
//
//         <Route path="/repayment-detail" element={<LoanRecordDetailPage />}>
//           <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
//           <Route path="extend-modal" element={<ExtendModal />} />
//           <Route path="repayment-modal" element={<RepaymentModal />} />
//           <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
//         </Route>
//
//         <Route path="/loan-record" element={<LoanRecordPage />} />
//         <Route path="/my-coupon-list" element={<MyCouponListPage />} />
//         <Route path="/mu-coupon" element={<MyCouponPage />} />
//         <Route path="/partner" element={<PartnerPage />} />
//
//         <Route path="/personal-info" element={<PersonalInfoPage />} >
//           <Route path="log-out-modal" element={<LogoutModal />} />
//         </Route>
//
//         <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//         <Route path="/quota-model" element={<QuotaModelPage />} />
//         <Route path="/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
//         <Route path="/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
//         <Route path="/log-out-modal" element={<LogoutModal />} />
//
//         <Route path="*" element={<div>Not Found</div>} />
//       {/*</Routes>*/}
//
//     </>
//   )
// );
