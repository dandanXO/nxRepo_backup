import React, { useEffect, useState } from "react";
import ExtendModal from "../../modals/ExtendModal/ExtendModal";
import ExtensionDetailModal from "../../pages/LoanDetailsPage/modal/ExtensionDetailModal";
import AmountPaidModal from "../../modals/AmountPaidModal/AmountPaidModal";
import RepaymentModal from "../../pages/LoanDetailsPage/modal/RepaymentModal";
import RepaymentNoticeModal from "../../pages/LoanDetailsPage/modal/RepaymentNoticeModal";
import LoanInfo from "./LoanInfo";
import LoanDetail from "./LoanDetail";
import {CustomPage} from "../../pages/BindBankAccountPage/components/CustomPage";
import {Attention} from "./Attention";
import {Button} from "@frontend/mobile/shared/ui";
import styled from "styled-components";
import {i18nComponentsKey} from "../i18n/translations";
import {useTranslation} from "react-i18next";

const StyledUploadReceiptSection = styled.div`
  .uploadButton {
    padding: 0px 12px;
    button {
      width: 100%;
      font-weight: bold;
    }
  }

  .noticeText {
    color: ${({ theme }) => theme.color.gray500};
    font-size: ${({ theme }) => theme.fontSize[12]};
    padding: 18px 12px;
  }
`
export interface PureLoanDetailsPageProps {
    currentData?: any;
    navigateToUploadPaymentReceiptPage: any;
    handlePostRepayCreate: any;
    paymentMethodList: string[];
    setPayType: React.Dispatch<React.SetStateAction<number>>;
}

const PureLoanDetails = (props: PureLoanDetailsPageProps) => {
    const {t} = useTranslation();
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
            setShowExtendModal={setShowExtendModal}
            setShowRepaymentModal={setShowRepaymentModal}
          />

          <LoanDetail
            {...props.currentData}
          />

          <Attention/>

          {(props.currentData?.status === "UNPAID" || props.currentData?.status === "OVERDUE") && (
            <StyledUploadReceiptSection>
              <div
                className={"uploadButton"}
                onClick={props.navigateToUploadPaymentReceiptPage}
              >
                <Button styleType={"ghost"}>{t("Upload Receipt", {ns: i18nComponentsKey})}</Button>
              </div>

              <div className={"noticeText"}>
                {t("After completing the repayment, take a screenshot and upload your repayment receipt here.", {ns: i18nComponentsKey})}
              </div>

            </StyledUploadReceiptSection>
          )}

        </React.Fragment>
      </CustomPage>
    );
};

export default PureLoanDetails;
