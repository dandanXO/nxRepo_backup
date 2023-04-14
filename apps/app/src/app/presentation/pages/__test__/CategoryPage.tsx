import {Route} from "react-router";
import React from "react";
import {ApplicationProgressPage} from "../ApplicationProgressPage";
import {PagePathEnum} from "../PagePathEnum";
import cx from "classnames";
import {Button} from "../../components/layouts/Button";
import {useNavigate} from "react-router";

export const CategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button dataTestingID={"apply"} text={"Test"} bgColor={cx({
        "bg-[#F58B10]": true,
      })}
          onClick={() => {
            navigate("/my-coupon-list")
          }}
      />
      {/*<div><div to="/">IndexPage</div></div>*/}
      {/*<div><div to="/login">Login</div></div>*/}
      {/*<div><div to="/application-progress">ApplicationProgressPage</div></div>*/}
      {/*<div><div to="/auth">AuthPage</div></div>*/}
      {/*<div><div to="/bankcard-list">BankCardListPage</div></div>*/}
      {/*<div><div to="/bind-bankcard">BindBankCardPage</div></div>*/}
      {/*<div><div to="/customer-service">CustomerServicePage</div></div>*/}
      {/*<div><div to="/disclosure-statement">DisclosureStatementPage</div></div>*/}
      {/*<div><div to="/extend-details">ExtendDetailsPage</div></div>*/}
      {/*<div><div to="/finished-repayment">FinishedRepaymentPage</div></div>*/}
      {/*<div><div to={PagePathEnum.RepaymentDetailPage}>LoanRecordDetailPage</div></div>*/}
      {/*<div><div to={PagePathEnum.RepaymentPage}>PaymentPage</div></div>*/}
      {/*<div><div to="/my-coupon-list">MyCouponListPage</div></div>*/}
      {/*<div><div to="/mu-coupon">MyCouponPage</div></div>*/}
      {/*<div><div to="/partner">PartnerPage</div></div>*/}
      {/*<div><div to={PagePathEnum.PersonalInfoPage}>PersonalInfoPage</div></div>*/}
      {/*<div><div to="/privacy-policy">PrivacyPolicyPage</div></div>*/}
      {/*<div><div to="/quota-model">QuotaModelPage</div></div>*/}
      {/*<div><div to="/uploaded-payment-receipt">UploadedPaymentReceiptPage</div></div>*/}
      {/*<div><div to="/upload-payment-receipt">UploadPaymentReceiptPage</div></div>*/}
    </div>
  )
}
