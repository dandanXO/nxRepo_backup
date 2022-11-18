import styled from "styled-components";
import React from "react";
import { GetLoanDetailResponse } from "../../../api/getLoanDetail";
import {
    Tag,
    ListItem,
    Button,
    AmountPaidIcon,
} from "@frontend/mobile/shared/ui";
import {environment} from "../../../../environments/environment";
import {useTranslation} from "react-i18next";
import {i18nComponentsKey} from "../i18n/translations";
import LoanBrand from "../LoanBrand";
import Card from "../Card";

const LoanInfoStyled = styled.div`
    text-align: center;
    .totalTitle {
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize[14]};
    }
    .totalText {
        font-size: ${({ theme }) => theme.fontSize[26]};
        font-weight: bold;
        margin: 18px 12px;
    }
    .errorText {
        color: ${({ theme }) => theme.color.red};
        font-size: ${({ theme }) => theme.fontSize[12]};
        line-height: 1.17;
        margin: 18px 12px;
    }
    .loanInfo-Card-Title {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        width: 100%;
        margin-bottom: 10px;
        text-align: left;
    }
    .loanInfo-Card-list {
        width: 100%;
    }
    .relatedRepayment {
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
        button {
            text-align: right;
            color: ${({ theme }) => theme.color.blue};
            font-size: ${({ theme }) => theme.fontSize[14]};
            text-decoration: underline;
        }
    }

    .payButtons {
      display: flex;
      justify-content: space-between;
      padding: 0 14px;
      width: 100%;
      .extendButton {
        flex: 1 3;
        margin-right: 12px;
      }
      .repayButton {
        flex: 3 1;
      }
    }

`;

type LoanInfoProps = Pick<
    GetLoanDetailResponse,
    | "iconUrl"
    | "productName"
    | "totalDueAmount"
    | "status"
    | "paidAmount"
    | "balance"
    | "extended"
    | "orderNo"
    | "extendable"
> & {
    setShowExtensionModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
    navigateToUploadPaymentReceiptPage: () => void;
} & {
  setShowExtendModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRepaymentModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoanInfo = (props: LoanInfoProps) => {
    const {
        iconUrl,
        productName,
        totalDueAmount,
        status,
        paidAmount,
        balance,
        extended,
        setShowExtensionModal,
        setShowAmountPaidModal,
        orderNo,
        setShowExtendModal,
        setShowRepaymentModal,
        extendable,
    } = props;

    const {t} = useTranslation();
    return (
        <LoanInfoStyled>
            <LoanBrand
                iconUrl={iconUrl ? iconUrl : ""}
                productName={productName ? productName : ""}
                sizeType={"small"}
            />

            <div className="totalTitle">{t("Total Due", {ns: i18nComponentsKey})}</div>

            <div className="totalText">{environment.currency} {totalDueAmount}</div>

            {status === "OVERDUE" && (
                <div className={"errorText"}>
                    {t("Your payment is now N days overdue.We kindly request that you immediately satisfy the balance in order to maintain a good loan relationship without affecting your loan credit.", {ns: i18nComponentsKey})}
                </div>
            )}

            <Card isHot={false}>
                <div className={"loanInfo-Card-Title"}>{t("General", {ns: i18nComponentsKey})}</div>
                <div className={"loanInfo-Card-list"}>
                    <ListItem
                      title={"No."}
                      text={orderNo || ""}
                    />
                    <ListItem
                        title={"State"}
                        text={
                            <Tag status={status ? status : "EXTEND"}>
                                {status}
                            </Tag>
                        }
                    />
                    <ListItem
                        title={
                            <div>
                                <div>Amount Paid</div>
                                <div
                                    onClick={() => setShowAmountPaidModal(true)}
                                >
                                    <img src={AmountPaidIcon} />
                                </div>
                            </div>
                        }
                        text={`${environment.currency} ${paidAmount}`}
                    />

                    {status !== "PAY_OFF" && (
                        <ListItem title={"Balance"} text={`${environment.currency} ${balance}`} />
                    )}


                </div>

                <React.Fragment>
                    {extended && (
                        <div className={"relatedRepayment"}>
                            <Button
                                onClick={() => setShowExtensionModal(true)}
                                styleType={"link"}
                            >
                                {`${t("Related repayment", {ns: i18nComponentsKey})} >`}
                            </Button>
                        </div>
                    )}
                </React.Fragment>

              <div className={"payButtons"}>
                {
                  extendable !== undefined && extendable && (
                    <Button
                      onClick={() => setShowExtendModal && setShowExtendModal(true)}
                      className={"extendButton"}
                      styleType="secondary"
                    >
                      {t("Extend", {ns: i18nComponentsKey})}
                    </Button>
                  )
                }
                <Button
                  onClick={() => setShowRepaymentModal && setShowRepaymentModal(true)}
                  className={"repayButton"}
                  styleType="primary"
                >
                  {t("Repay", {ns: i18nComponentsKey})}
                </Button>
              </div>

            </Card>

        </LoanInfoStyled>
    );
};

export default LoanInfo;
