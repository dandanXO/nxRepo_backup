import {useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {Route, Routes, useLocation} from "react-router";
import AppDataCollector from "../../modules/dataCollectorContainer/AppDataCollector";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import BindBankCardPage from "../pages/BindBankCardPage";
import IBANFinderModal from "../modals/i18n/pakistan/IBANFinderModal";
import IBANFinderPage from "../pages/i18n/paskitan/IBANFinderPage";
import RepaymentDetailPage from "../pages/RepaymentDetailPage";
import RepaymentModal from "../modals/RepaymentModal";
import AmountRepaidModal from "../modals/AmountRepaidModal/AmountRepaidModal";
import ExtendConfirmModal from "../modals/ExtendConfirmModal";
import ExtendModal from "../modals/ExtendModal";
import RepamentCouponModal from "../modals/RepaymentCouponModal";
import PaymentResultPage from "../pages/PaymentResultPage";
import UploadedPaymentReceiptPage from "../pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../pages/CouponModalContentAndroidWebviewPage";
import {CategoryPage} from "../pages/__test__/CategoryPage";
import {ErrorPage} from "../pages/__test__/ErrorPage";
import APIBoundaryModal from "../modals/APIBoundaryModal";
import LoadingMask from "../core-components/LoadingMask";
import React from "react";

export const AppRouter = () => {
  const isInit: boolean = useSelector((state: RootState) => state.app.isInit);

  const location = useLocation();

  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
  const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);
  const pageLoading = useSelector((state:any) => state.pageLoading);

  // NOTICE: 純 H5 在用畫面阻擋
  // if(NativeAppInfo.mode === 'H5' && !isInit) {
  // if(!isInit) {
  // return <div>APP initialized wrongly</div>
  // return <div>H5 mode is initializing</div>
  // }
  // }

  // React.useEffect(() => {
  //   // new
  //   posthog.capture('$pageview');
  // }, [location]);


  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
        <Route path={PageOrModalPathEnum.BindBankcard} element={<BindBankCardPage />}>
          <Route path="iban-finder-modal" element={<IBANFinderModal />} />
        </Route>

        <Route path={PageOrModalPathEnum.IBANFinderPage} element={<IBANFinderPage />} />


        <Route path={PageOrModalPathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>
        <Route path={PageOrModalPathEnum.PaymentResultPage} element={<PaymentResultPage />}/>


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
