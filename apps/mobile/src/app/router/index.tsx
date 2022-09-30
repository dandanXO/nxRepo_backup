import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoanDetailsPage from "../pages/LoanDetailsPage";
import ExtendDetailsPage from "../pages/ExtendDetailsPage";
import UploadPaymentReceiptPage from "../pages/UploadPaymentReceiptPage";
import BindBankAccountPage from "../pages/BindBankAccountPage";
import UploadedPaymentReceiptPage from "../pages/UploadedPaymentReceiptPage";
import ProductAdModalListPage from "../pages/ProductAdModalListPage";

// NOTE:
// https://stackoverflow.com/questions/10302179/hyphen-underscore-or-camelcase-as-word-delimiter-in-uris
// https://developers.google.com/search/docs/advanced/guidelines/url-structure?hl=en&visit_id=637961283238394064-158551757&rd=1
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                {/* url: /loan-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
                <Route path="/loan-details" element={<LoanDetailsPage />} />
                {/* url: /extend-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
                <Route path="/extend-details" element={<ExtendDetailsPage />} />
              <Route path="/repayment-modal-advertisement" element={<div />} />
                <Route path="/bank-bind" element={<BindBankAccountPage />} />
                <Route path="/upload-payment-receipt" element={<UploadPaymentReceiptPage />}/>
                <Route path="/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />}/>
                <Route path="/product-ad-modal-list" element={<ProductAdModalListPage />}/>
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
};
