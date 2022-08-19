import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import DemoPage from "../pages/DemoPage";
import LoanDetailsPage from "../pages/LoanDetailsPage";
import ExtendDetailsPage from "../pages/ExtendDetailsPage";
import UploadPaymentReceiptPage from "../pages/UploadPaymentReceiptPage";
import BankAccountPage from "../pages/BankAccountPage";

// NOTE:
// https://stackoverflow.com/questions/10302179/hyphen-underscore-or-camelcase-as-word-delimiter-in-uris
// https://developers.google.com/search/docs/advanced/guidelines/url-structure?hl=en&visit_id=637961283238394064-158551757&rd=1
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/demo" element={<DemoPage/>}/>
                {/* url: /loan-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
                <Route path="/loan-details" element={<LoanDetailsPage/>}/>
                {/* url: /extend-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
                <Route path="/extend-details" element={<ExtendDetailsPage/>}/>
                <Route path="/bank-bind" element={<BankAccountPage/>}/>
                <Route path="/upload-payment-receipt" element={<UploadPaymentReceiptPage/>}/>
                <Route path="*" element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
