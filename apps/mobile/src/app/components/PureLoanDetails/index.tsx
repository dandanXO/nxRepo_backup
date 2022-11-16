import React, { useEffect, useState } from "react";
import ExtendModal from "../../modal/ExtendModal/ExtendModal";
import ExtensionDetailModal from "../../pages/LoanDetailsPage/modal/ExtensionDetailModal";
import AmountPaidModal from "../../modal/AmountPaidModal/AmountPaidModal";
import RepaymentModal from "../../pages/LoanDetailsPage/modal/RepaymentModal";
import RepaymentNoticeModal from "../../pages/LoanDetailsPage/modal/RepaymentNoticeModal";
import LoanInfo from "./LoanInfo";
import LoanDetail from "./LoanDetail";
import {CustomPage} from "../../pages/BindBankAccountPage/components/CustomPage";

export interface PureLoanDetailsPageProps {
    currentData?: any;
    navigateToUploadPaymentReceiptPage: any;
    handlePostRepayCreate: any;
    paymentMethodList: string[];
    setPayType: React.Dispatch<React.SetStateAction<number>>;
}

const PureLoanDetails = (props: PureLoanDetailsPageProps) => {
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);
    const [showRepaymentModal, setShowRepaymentModal] = useState(false);
    const [showRepaymentNoticeModal, setShowRepaymentNoticeModal] =
        useState(false);
    const [repayBalance, setRepayBalance] = useState(
        props?.currentData?.balance
    );
    useEffect(() => {
        setRepayBalance(props?.currentData?.balance);
    }, [props.currentData]);
    return (
      <CustomPage>
        <React.Fragment>
          {showExtendModal && (
            <ExtendModal
              setShowExtendModal={setShowExtendModal}
              {...props.currentData}
              handlePostRepayCreate={props.handlePostRepayCreate}
            />
          )}
          {showExtensionModal && (
            <ExtensionDetailModal
              parentOrderNo={props.currentData.parentOrderNo}
              setShowExtensionModal={setShowExtensionModal}
            />
          )}
          {props.currentData && showAmountPaidModal && (
            <AmountPaidModal
              {...props.currentData}
              setShowAmountPaidModal={setShowAmountPaidModal}
            />
          )}
          {showRepaymentModal && (
            <RepaymentModal
              balance={props.currentData.balance}
              setRepayBalance={setRepayBalance}
              setShowRepaymentModal={setShowRepaymentModal}
              setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
              handlePostRepayCreate={props.handlePostRepayCreate}
              paymentMethodList={props.paymentMethodList}
              setPayType={props.setPayType}
            />
          )}
          {showRepaymentNoticeModal && (
            <RepaymentNoticeModal
              balance={repayBalance}
              setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
              handlePostRepayCreate={props.handlePostRepayCreate}
            />
          )}
          <LoanInfo
            {...props.currentData}
            setShowExtensionModal={setShowExtensionModal}
            setShowAmountPaidModal={setShowAmountPaidModal}
            navigateToUploadPaymentReceiptPage={
              props.navigateToUploadPaymentReceiptPage
            }
          />
          <LoanDetail
            {...props.currentData}
            setShowExtendModal={setShowExtendModal}
            setShowRepaymentModal={setShowRepaymentModal}
          />
        </React.Fragment>
      </CustomPage>
    );
};

export default PureLoanDetails;
