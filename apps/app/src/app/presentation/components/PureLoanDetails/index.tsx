import React, {useEffect, useState} from "react";
import LoanInfo from "./LoanInfo";
import LoanDetail from "./LoanDetail";

import {Attention} from "./Attention";
import {Button} from "@frontend/mobile/shared/ui";
import styled from "styled-components";
import {i18nComponents} from "../i18n/translations";
import {useTranslation} from "react-i18next";

import {environment} from "../../../../environments/environment";
import {useLockRequest} from "../../hooks/useLockRequest";


import ExtensionDetailModal from "../../modals/old/ExtensionDetailModal";

import RepaymentModal from "../../modals/old/RepaymentModal";
import RepaymentAdsModal from "../../modals/old/RepaymentAdsModal";
import RepaymentNoticeModal from "../../modals/old/RepaymentNoticeModal";
import {I18nRepaymentStepsModal} from "../../modals/old/RepaymentStepsModal";

import {CustomPage} from "../../pages/BindBankCardPage/components/CustomPage";
import ExtendModal from "../../modals/ExtendModal";
import AmountPaidModal from "../../modals/AmountRepaidModal/AmountRepaidModal";
import {AllCountryInstance} from "../../../../../../../libs/shared/domain/src/country/AllCountryInstance";



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
    isRepayTypesFetching: boolean;
    paymentMethodList: string[];
    setPayType: React.Dispatch<React.SetStateAction<number>>;
}

const PureLoanDetails = (props: PureLoanDetailsPageProps) => {

    const {t} = useTranslation(i18nComponents.namespace);
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);
    const [showRepaymentModal, setShowRepaymentModal] = useState(false);
    const [showRepaymentNoticeModal, setShowRepaymentNoticeModal] = useState(false);
    const [showRepaymentAdsModal, setShowRepaymentAdsModal] = useState(false);
    const [showRepaymentSteps, setShowRepaymentSteps] = useState(false);

    const [repayBalance, setRepayBalance] = useState(
        props?.currentData?.balance
    );
    useEffect(() => {
        setRepayBalance(props?.currentData?.balance);
    }, [props.currentData]);


  const [balanceValue, setBalanceValue] = useState(String(`${environment.currency}` + props.currentData?.balance));
  useEffect(() => {
    setBalanceValue(String(`${environment.currency}` + props.currentData?.balance));
  }, [props.currentData]);

  const [payload, setPayload] = useState<{
    isExtend: boolean;
    isForceApplyAfterRepay: boolean;
    repayAmount: number;
  }>()

  //NOTE: 設定還款參數
  const repayUseCase = (isExtend: boolean, isForceApplyAfterRepay: boolean, repayAmount: number) => {
    console.log("[repay] repayUseCase.isExtend", isExtend)
    console.log("[repay] repayUseCase.isForceApplyAfterRepay", isForceApplyAfterRepay)
    console.log("[repay] repayUseCase.repayAmount", repayAmount)
    const payloadData = {
      isExtend,
      isForceApplyAfterRepay,
      repayAmount,
    };
    console.log("[repay] payloadData", payloadData);
    // NOTICE: 這邊居然無法正確給值
    setPayload(payloadData);

    // NOTICE: 展期流程
    if(isExtend) {
      repaymentUseCase(payloadData);
    } else {
      if(environment.country === AllCountryInstance.IndiaCountry.country) {
        // NOTICE: 印度直接還款
        repaymentUseCase(payloadData);
      } else {
        if(isForceApplyAfterRepay) {
          // NOTICE: 續借
        } else {
          setShowRepaymentSteps(true);
        }
      }
    }


  }
  //NOTE: 執行還款
  const repaymentUseCase = (payloadData: any) => {
    if(isRequestPending("handlePostRepayCreate")) {
      return;
    } else {
      startRequest("handlePostRepayCreate");
    }
    setShowRepaymentSteps(false);
    setShowRepaymentAdsModal(false);

    // NOTICE: 這邊居然無法正確從payload 拿值
    console.log("[repay] repaymentUseCase.payload", payload);
    console.log("[repay] repaymentUseCase.payloadData", payloadData);
    props.handlePostRepayCreate(
      payloadData?.isExtend,
      payloadData?.isForceApplyAfterRepay,
      payloadData?.repayAmount
    ).then(() => {
      //
    }).catch(() => {
      // setShowRepaymentAdsModal(true);
      // setShowRepaymentSteps(true);
    }).finally(() => {
      endRequest("handlePostRepayCreate");
      // setPayload({});
    })
  }

  const {startRequest, endRequest, isRequestPending} = useLockRequest("handlePostRepayCreate");

    return (
      <CustomPage>
        <React.Fragment>
          {showExtendModal && (
            <ExtendModal
              setShowExtendModal={setShowExtendModal}
              {...props.currentData}
              handlePostRepayCreate={repayUseCase}
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
          {/*還款流程*/}
          {showRepaymentModal && (
            <RepaymentModal
              balance={props.currentData?.balance}
              setRepayBalance={setRepayBalance}

              balanceValue={balanceValue}
              setBalanceValue={setBalanceValue}

              setShowRepaymentModal={setShowRepaymentModal}
              setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
              paymentMethodList={props.paymentMethodList}
              isRepayTypesFetching={props.isRepayTypesFetching}
              setPayType={props.setPayType}
              setShowRepaymentAdsModal={setShowRepaymentAdsModal}
            />
          )}
          {/*還款再借款廣告*/}
          {showRepaymentAdsModal && (
            <RepaymentAdsModal
              setShowRepaymentModal={setShowRepaymentModal}
              balance={balanceValue}
              handlePostRepayCreate={repayUseCase}
              setShowRepaymentAdsModal={setShowRepaymentAdsModal}
              // setShowRepaymentModal={setShowRepaymentModal}
              setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
            />
          )}
          {/*還款再借款須知*/}
          {showRepaymentNoticeModal && (
            <RepaymentNoticeModal
              balance={props.currentData?.balance}
              setShowRepaymentNoticeModal={setShowRepaymentNoticeModal}
              handlePostRepayCreate={repayUseCase}
              repaymentUseCase={repaymentUseCase}
            />
          )}

          {showRepaymentSteps && (
            <I18nRepaymentStepsModal
              setShowRepaymentSteps={setShowRepaymentSteps}
              onCancel={() => {
                setShowRepaymentSteps(false);
                if(payload?.isForceApplyAfterRepay) {
                  setShowRepaymentNoticeModal(true);
                }
              }}
              onConfirmCallback={() => repaymentUseCase(payload)}
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
                <Button styleType={"ghost"}>{t("Upload Receipt")}</Button>
              </div>

              <div className={"noticeText"}>
                {t("After completing the repayment, take a screenshot and upload your repayment receipt here.")}
              </div>

            </StyledUploadReceiptSection>
          )}

        </React.Fragment>
      </CustomPage>
    );
};

export default PureLoanDetails;
