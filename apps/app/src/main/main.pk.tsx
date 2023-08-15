import "../polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import { SentryModule } from '../app/modules/sentry';

import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider, useSelector} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes, useLocation} from "react-router";
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
import posthog from "posthog-js";

import {AppThemeProvider} from "@frontend/mobile/shared/ui";

// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/modules/window/IWindow';
import "../app/modules/errorHandler";
import '../app/modules/posthog';
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
import {CategoryPage} from "../app/presentation/pages/__test__/CategoryPage";
import {ErrorPage} from "../app/presentation/pages/__test__/ErrorPage";
import IBANFinderPage from "../app/presentation/pages/i18n/paskitan/IBANFinderPage";
import BindBankCardPage from "../app/presentation/pages/BindBankCardPage";
import RepaymentDetailPage from "../app/presentation/pages/RepaymentDetailPage";
import UploadedPaymentReceiptPage from "../app/presentation/pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../app/presentation/pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../app/presentation/pages/CouponModalContentAndroidWebviewPage";
// Modal
import IBANFinderModal from "../app/presentation/modals/i18n/pakistan/IBANFinderModal";
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
  const isInit: boolean = useSelector((state: RootState) => state.app.isInit);

  const location = useLocation();

  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
  const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);
  const isOrderOverdue = payableRecords && payableRecords?.some((order) => order.overdue === true);
  const pageLoading = useSelector((state:any) => state.pageLoading);

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
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}>
          <Route path="iban-finder-modal" element={<IBANFinderModal />} />
        </Route>

        <Route path={PagePathEnum.IBANFinderPage} element={<IBANFinderPage />} />


        <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>


        <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
        <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />



        <Route path="/v2/coupon-modal-content" element={<CouponModalContentAndroidWebviewPage />} />


        <Route path="/v2/category" element={<CategoryPage />} />
        <Route path="/v2/error" element={<ErrorPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>


      {apiBoundary.show && <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message} />}

      {pageLoading.show && <LoadingMask/>}

      {/*</Suspense>*/}
    </AppDataCollector>
  );
};


renderApp();
