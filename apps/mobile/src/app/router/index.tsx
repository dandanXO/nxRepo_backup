import React, {ReactComponentElement, Suspense, useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import loadable from '@loadable/component'
import useErrorModal from "../../../../../packages/cms-webpack4/src/modules/shared/hooks/useConfirmModal";
// import {I18nRepaymentStepsModal} from "../components/pages/LoanDetailsPage/modal/RepaymentStepsModal";


// NOTE: JS way1
// import(/* webpackChunkName: "chunk-test" */ "../test").then((module) => {
//   module.default.test();
// })

// NOTE: Component - way1
import IndexPage from "../components/pages/IndexPage";
import LoanDetailsPage, {STATE_REPAYMENT_STEPS} from "../components/pages/LoanDetailsPage";
import ExtendDetailsPage from "../components/pages/ExtendDetailsPage";
import BindBankAccountPage from "../components/pages/BindBankAccountPage";
import UploadPaymentReceiptPage from "../components/pages/UploadPaymentReceiptPage";
import UploadedPaymentReceiptPage from "../components/pages/UploadedPaymentReceiptPage";
import OldProductAdModalListPage from "../components/pages/OldProductAdModalListPage";
import ProductAdModalListPage from "../components/pages/ProductAdModalListPage";
import ActivityAdListPage, {DemoActivityAdListPage} from "../components/pages/ActivityAdListPage";
import NewsSectionPage from "../components/pages/NewsSectionPage";


// NOTE: Component - way2
// NOTICE: TS1323: Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', or 'nodenext'.
const LazyIndexPage = React.lazy(() => import(/* webpackChunkName: "chunk-index" */ "../components/pages/IndexPage"))
const LazyLoanDetailsPage = React.lazy(() => import(/* webpackChunkName: "chunk-loan-details" */ "../components/pages/LoanDetailsPage"))
const LazyExtendDetailsPage = React.lazy(() => import(/* webpackChunkName: "chunk-extend-details" */ "../components/pages/ExtendDetailsPage"))
const LazyBindBankAccountPage = React.lazy(() => import(/* webpackChunkName: "chunk-bind-bank-account" */ "../components/pages/BindBankAccountPage"))
const LazyUploadPaymentReceiptPage = React.lazy(() => import(/* webpackChunkName: "chunk-upload-payment-receipt" */ "../components/pages/UploadPaymentReceiptPage"))
const LazyUploadedPaymentReceiptPage = React.lazy(() => import(/* webpackChunkName: "chunk-uploaded-payment-receipt" */ "../components/pages/UploadedPaymentReceiptPage"))
const LazyProductAdModalListPage = React.lazy(() => import(/* webpackChunkName: "chunk-product-ad-modal-list" */ "../components/pages/ProductAdModalListPage"))
const LazyActivityAdListPage = React.lazy(() => import(/* webpackChunkName: "chunk-activity-ad-modal-list" */ "../components/pages/ActivityAdListPage"))
const LazyNewsSectionPage = React.lazy(() => import(/* webpackChunkName: "chunk-news-section" */ "../components/pages/NewsSectionPage"))

// NOTE: Component - way3 = Error
// let LazyIndexPage: any;
// import(/* webpackChunkName: "chunk-index" */ "../components/pages/IndexPage").then((module) => {
//   LazyIndexPage = module.default;
// })
//
// let LazyLoanDetailsPage: any;
// import(/* webpackChunkName: "chunk-loan-details" */ "../components/pages/LoanDetailsPage").then((module) => {
//   LazyLoanDetailsPage = module.default;
// })
//
// let LazyExtendDetailsPage: any;
// import(/* webpackChunkName: "chunk-extend-details" */ "../components/pages/ExtendDetailsPage").then((module) => {
//   LazyExtendDetailsPage = module.default;
// })
//
// let LazyBindBankAccountPage: any;
// import(/* webpackChunkName: "chunk-bind-bank-account" */ "../components/pages/BindBankAccountPage").then((module) => {
//   LazyBindBankAccountPage = module.default;
// })
//
// let LazyUploadPaymentReceiptPage: any;
// import(/* webpackChunkName: "chunk-upload-payment-receipt" */ "../components/pages/UploadPaymentReceiptPage").then((module) => {
//   LazyUploadPaymentReceiptPage = module.default;
// })
//
// let LazyUploadedPaymentReceiptPage: any;
// import(/* webpackChunkName: "chunk-uploaded-payment-receipt" */ "../components/pages/UploadedPaymentReceiptPage").then((module) => {
//   LazyUploadedPaymentReceiptPage = module.default;
// })
//
// let LazyProductAdModalListPage: any;
// import(/* webpackChunkName: "chunk-product-ad-modal-list" */ "../components/pages/ProductAdModalListPage").then((module) => {
//   LazyProductAdModalListPage = module.default;
// })
//
// let LazyActivityAdListPage: any;
// import(/* webpackChunkName: "chunk-activity-ad-modal-list" */ "../components/pages/ActivityAdListPage").then((module) => {
//   LazyActivityAdListPage = module.default;
// })
//
// let LazyNewsSectionPage: any;
// import(/* webpackChunkName: "chunk-news-section" */ "../components/pages/NewsSectionPage").then((module) => {
//   LazyNewsSectionPage = module.default;
// })

// NOTE: Component - way4
// const LazyIndexPage = loadable(() => import(/* webpackChunkName: "chunk-index" */ "../components/pages/IndexPage"))
// const LazyLoanDetailsPage = loadable(() => import(/* webpackChunkName: "chunk-loan-details" */ "../components/pages/LoanDetailsPage"))
// const LazyExtendDetailsPage = loadable(() => import(/* webpackChunkName: "chunk-extend-details" */ "../components/pages/ExtendDetailsPage"))
// const LazyBindBankAccountPage = loadable(() => import(/* webpackChunkName: "chunk-bind-bank-account" */ "../components/pages/BindBankAccountPage"))
// const LazyUploadPaymentReceiptPage = loadable(() => import(/* webpackChunkName: "chunk-upload-payment-receipt" */ "../components/pages/UploadPaymentReceiptPage"))
// const LazyUploadedPaymentReceiptPage = loadable(() => import(/* webpackChunkName: "chunk-uploaded-payment-receipt" */ "../components/pages/UploadedPaymentReceiptPage"))
// const LazyProductAdModalListPage = loadable(() => import(/* webpackChunkName: "chunk-product-ad-modal-list" */ "../components/pages/ProductAdModalListPage"))
// const LazyActivityAdListPage = loadable(() => import(/* webpackChunkName: "chunk-activity-ad-modal-list" */ "../components/pages/ActivityAdListPage"))
// const LazyNewsSectionPage = loadable(() => import(/* webpackChunkName: "chunk-news-section" */ "../components/pages/NewsSectionPage"))

// LazyIndexPage.preload();
// LazyLoanDetailsPage.preload();
// LazyExtendDetailsPage.preload();
// LazyBindBankAccountPage.preload();
// LazyUploadPaymentReceiptPage.preload();
// LazyUploadedPaymentReceiptPage.preload();
// LazyProductAdModalListPage.preload();
// LazyActivityAdListPage.preload();
// LazyNewsSectionPage.preload();

// LazyIndexPage.load().then(() => {//
//   //
//   });
// LazyLoanDetailsPage.load().then(() => {//
//   //
//   });
// LazyExtendDetailsPage.load().then(() => {//
//   //
// });
// LazyBindBankAccountPage.load().then(() => {//
//   //
// });
// LazyUploadPaymentReceiptPage.load().then(() => {//
//   //
// });
// LazyUploadedPaymentReceiptPage.load().then(() => {//
//   //
// });
// LazyProductAdModalListPage.load().then(() => {//
//   //
// });
// LazyActivityAdListPage.load().then(() => {//
//   //
// });
// LazyNewsSectionPage.load().then(() => {
//   //
// });


// NOTICE:
// Consider adding an error boundary to your tree to customize error handling behavior.
//   Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

// NOTICE:
// react-dom.development.js:19055 Uncaught Error: A component suspended while responding to synchronous input.
// This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.


// NOTE:
// https://stackoverflow.com/questions/10302179/hyphen-underscore-or-camelcase-as-word-delimiter-in-uris
// https://developers.google.com/search/docs/advanced/guidelines/url-structure?hl=en&visit_id=637961283238394064-158551757&rd=1
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Pages/>
    </BrowserRouter>
  );
};


const Pages = () => {
  // const location = useLocation();
  // const showRepaymentStepsModal = location.state && location.state.name === STATE_REPAYMENT_STEPS;
  // console.log("showRepaymentStepsModal", showRepaymentStepsModal);
  // const state = location.state as { name?: Location };
  const location = useLocation();

  // useEffect(() => {
  //   if(!location.pathname) return;
  //
  //   console.log("location", location);
  //   const map = {
  //     "/": LazyIndexPage,
  //     "/loan-details": LazyLoanDetailsPage,
  //     "/extend-details": LazyExtendDetailsPage,
  //     "/bank-bind": LazyBindBankAccountPage,
  //     "/upload-payment-receipt": LazyUploadPaymentReceiptPage,
  //     "/uploaded-payment-receipt": LazyUploadedPaymentReceiptPage,
  //     "/product-ad-modal-list": LazyProductAdModalListPage,
  //     "/activity-list": LazyActivityAdListPage,
  //     "/news-section": LazyNewsSectionPage,
  //   } as any;
  //   (map[location.pathname] as any).preload();
  //
  //   Object.keys(map).map(routeKey => {
  //     (map[routeKey] as any).load();
  //   })
  //
  // }, [location])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes >
        <Route path="/" element={<LazyIndexPage />}/>
        {/* url: /loan-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
        <Route path="/loan-details" element={<LazyLoanDetailsPage />} />

        {/* url: /extend-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
        <Route path="/extend-details" element={<LazyExtendDetailsPage />} />

        {/*<Route path="/repayment-modal-advertisement" element={<div />} />*/}

        <Route path="/bank-bind" element={<LazyBindBankAccountPage />} />
        <Route path="/upload-payment-receipt" element={<LazyUploadPaymentReceiptPage />}/>
        <Route path="/uploaded-payment-receipt" element={<LazyUploadedPaymentReceiptPage />}/>
        {/*<Route path="/product-ad-modal-list-old" element={<OldProductAdModalListPage />}/>*/}

        <Route path="/product-ad-modal-list" element={<LazyProductAdModalListPage />}/>

        {/*NOTICE: ad 字眼容易被 Google 擋*/}
        <Route path="/activity-list" element={<LazyActivityAdListPage />}/>
        {/*<Route path="/activity-list-dev" element={<DemoActivityAdListPage/>}/>*/}
        <Route path="/news-section" element={<LazyNewsSectionPage/>}/>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {/*{state?.name && (*/}
      {/*  <Routes>*/}
      {/*    <Route path={`/loan-details`} element={<I18nRepaymentStepsModal/>}/>*/}
      {/*  </Routes>*/}
      {/*)}*/}
    </Suspense>
  )
}
