import {useSelector} from "react-redux";
import {Route, Routes, useLocation} from "react-router";
import {RootState} from "../../reduxStore";
import {AllCountry} from "../../../../../../libs/shared/domain/src/country/AllCountry";
import {environment} from "../../../environments/environmentModule/environment";
import i18next from "i18next";
import AppDataCollector from "../../modules/dataCollectorContainer/AppDataCollector";
import {PagePathEnum} from "../pages/PagePathEnum";
import BindBankCardPage from "../pages/BindBankCardPage";
import RepaymentDetailPage from "../pages/RepaymentDetailPage";
import RepaymentModal from "../modals/RepaymentModal";
import AmountRepaidModal from "../modals/AmountRepaidModal/AmountRepaidModal";
import ExtendConfirmModal from "../modals/ExtendConfirmModal";
import ExtendModal from "../modals/ExtendModal";
import RepamentCouponModal from "../modals/RepaymentCouponModal";
import PaymentCheckoutPage from "../pages/PaymentCheckoutPage";
import PaymentResultPage from "../pages/PaymentResultPage";
import UploadedPaymentReceiptPage from "../pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../pages/CouponModalContentAndroidWebviewPage";
import APIBoundaryModal from "../modals/APIBoundaryModal";
import LoadingMask from "../core-components/LoadingMask";
import React from "react";

export

const AppRouter = () => {
  // const isInit: boolean = useSelector((state: RootState) => state.app.isInit);
  const pageLoading = useSelector((state:any) => state.pageLoading);

  const location = useLocation();
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);

  // React.useEffect(() => {
  //   // new
  //   posthog.capture('$pageview');
  // }, [location]);

  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
        {/* <Route path={PagePathEnum.LoginPage} element={<LoginPage />}/> */}
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}/>
        <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>
        <Route path={PagePathEnum.PaymentCheckoutPage} element={<PaymentCheckoutPage />}/>
        <Route path={PagePathEnum.PaymentResultPage} element={<PaymentResultPage />}/>
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
