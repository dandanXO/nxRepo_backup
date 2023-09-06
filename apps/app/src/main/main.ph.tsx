import "../polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import { SentryModule } from '../app/modules/sentry';

import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider, useSelector} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes, useLocation} from "react-router";
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
// import posthog from "posthog-js";

import {AppThemeProvider} from "@frontend/mobile/shared/ui";

// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/modules/window/IWindow';
import "../app/modules/errorHandler";
// import '../app/modules/posthog';
import '../app/modules/sentry';
import '../app/modules/i18n';
import '../app/modules/timezone';
import { applyCustomTheme } from '../app/modules/theme';
import AppDataCollector from "../app/modules/dataCollectorContainer/AppDataCollector";

import {appStore, history, RootState} from "../app/reduxStore";
import { NativeAppInfo } from '../app/persistant/nativeAppInfo';

// Page
// PagePathEnum
import {PagePathEnum} from "../app/presentation/pages/PagePathEnum";
import BindBankCardPage from "../app/presentation/pages/BindBankCardPage";
import RepaymentDetailPage from "../app/presentation/pages/RepaymentDetailPage";
import RepaymentInfoPage from "../app/presentation/pages/RepaymentInfoPage";
import UploadedPaymentReceiptPage from "../app/presentation/pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../app/presentation/pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../app/presentation/pages/CouponModalContentAndroidWebviewPage";
// Modal
import RepaymentModal from "../app/presentation/modals/RepaymentModal";
import AmountRepaidModal from "../app/presentation/modals/AmountRepaidModal/AmountRepaidModal";
import ExtendConfirmModal from "../app/presentation/modals/ExtendConfirmModal";
import ExtendModal from "../app/presentation/modals/ExtendModal";
import RepamentCouponModal from "../app/presentation/modals/RepaymentCouponModal";
import APIBoundaryModal from "../app/presentation/modals/APIBoundaryModal";
import LoadingMask from "../app/presentation/components/LoadingMask";


// NOTE: Other
import '../style.css';
import {MonitorUsecaseFlow} from "../app/monitorUsecaseFlow";
import LoginPage from "../app/presentation/pages/LoginPage";
import { AllCountry } from "libs/shared/domain/src/country/AllCountry";
import { environment } from "../environments/environmentModule/environment";
import i18next from "i18next";

const renderApp = () => {
  // NOTE: Before rendering
  // console.log('[app] environment', environment);
  // console.log('[app] window.theme', window.theme);
  // console.log('[app] isInAndroid', isInAndroid());
  // console.log('[app] AndroidAppInfo', AndroidAppInfo);

  MonitorUsecaseFlow.appLoadAndroidAppInfo();

  // NOTICE: Theme
  applyCustomTheme(NativeAppInfo);
  // alertModal(JSON.stringify(NativeAppInfo));

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

  root.render(
    <StrictMode>
      <div>
        {/*NOTICE: Refactor ME window.theme */}
        <AppThemeProvider theme={window.theme}>
          <Provider store={appStore}>
            <ReduxRouter history={history} routerSelector={routerSelector}>
              <BrowserRouter basename={'/'}>
                <AppRouter />
              </BrowserRouter>
              {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
            </ReduxRouter>
          </Provider>
        </AppThemeProvider>
      </div>
    </StrictMode>
  );
};


const AppRouter = () => {
  // const isInit: boolean = useSelector((state: RootState) => state.app.isInit);
  const pageLoading = useSelector((state:any) => state.pageLoading);

  const location = useLocation();
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);

  // React.useEffect(() => {
  //   // new
  //   posthog.capture('$pageview');
  // }, [location]);
  const i18Language = AllCountry.find(i => i.country === environment.country);
  if (i18Language) {
    i18next
      .changeLanguage(i18Language?.language)
      .then((t) => {
        // console.log("changeLanguage:", environment.countryName);
      })
      .catch((err) => {
        // console.log("changeLanguage:", environment.countryName);
        // console.log("error:", err);
        const error = new Error();
        error.name = "changeLanguage";
        if (err) error.message = JSON.stringify(err);
        // if (AppFlag.enableSentry) {
        //     Sentry.captureException(error);
        // }
      });
  }
  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
         <Route path={PagePathEnum.LoginPage} element={<LoginPage />}/>
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}/>
        <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>
        <Route path={PagePathEnum.RepaymentInfoPage} element={<RepaymentInfoPage />}/>
        <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
        <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
        <Route path="/v2/coupon-modal-content" element={<CouponModalContentAndroidWebviewPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {apiBoundary.show && <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message} />}
      {pageLoading.show && <LoadingMask/>}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};

renderApp();

