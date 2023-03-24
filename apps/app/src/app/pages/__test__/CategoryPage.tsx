import {Link, Route} from "react-router-dom";
import React from "react";
import {ApplicationProgressPage} from "../ApplicationProgressPage";

export const CategoryPage = () => {
  return (
    <div>
      <div><Link to="/">IndexPage</Link></div>
      <div><Link to="/application-progress">ApplicationProgressPage</Link></div>
      <div><Link to="/auth">AuthPage</Link></div>
      <div><Link to="/bankcard-list">BankCardListPage</Link></div>
      <div><Link to="/bind-bankcard">BindBankCardPage</Link></div>
      <div><Link to="/customer-service">CustomerServicePage</Link></div>
      <div><Link to="/disclosure-statement">DisclosureStatementPage</Link></div>
      <div><Link to="/extend-details">ExtendDetailsPage</Link></div>
      <div><Link to="/finished-repayment">FinishedRepaymentPage</Link></div>
      <div><Link to="/loan-record-detail">LoanRecordDetailPage</Link></div>
      <div><Link to="/loan-record">LoanRecordPage</Link></div>
      <div><Link to="/my-coupon-list">MyCouponListPage</Link></div>
      <div><Link to="/mu-coupon">MyCouponPage</Link></div>
      <div><Link to="/partner">PartnerPage</Link></div>
      <div><Link to="/personal-info">PersonalInfoPage</Link></div>
      <div><Link to="/privacy-policy">PrivacyPolicyPage</Link></div>
      <div><Link to="/quota-model">QuotaModelPage</Link></div>
      <div><Link to="/uploaded-payment-receipt">UploadedPaymentReceiptPage</Link></div>
      <div><Link to="/upload-payment-receipt">UploadPaymentReceiptPage</Link></div>
    </div>
  )
}
