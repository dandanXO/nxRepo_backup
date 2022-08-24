import styled from "styled-components";
import React, { useCallback } from "react";
import {
    mockGetLoanDetailResponse,
    GetLoanDetailResponse,
} from "../api/getLoanDetail";
import Tag from "../core/components/Tag";
import Card from "../core/components/Card";
import ListItem from "../core/components/ListItem";
import Button from "../core/components/Button";
import LoanBrand from "../core/components/LoanBrand";
import AmountPaidIcon from "../core/components/images/amount_paid_icon.svg";
import { useNavigate } from "react-router-dom";
import useLocationOrderQueryString from "../core/hooks/useLocationOrderQueryString";

const LoanInfoStyled = styled.div`
    text-align: center;
    .totalTitle {
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize[14]};
    }
    .totalText {
        font-size: ${({ theme }) => theme.fontSize[26]};
        font-weight: bold;
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
        button {
            color: ${({ theme }) => theme.color.blue};
            font-size: ${({ theme }) => theme.fontSize[14]};
        }
    }
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
> & {
    setShowExtensionModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
    navigateToUploadPaymentReceiptPage: () => void;
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
    } = props;

    return (
        <LoanInfoStyled>
            <LoanBrand
                iconUrl={iconUrl ? iconUrl : ""}
                productName={productName ? productName : ""}
                sizeType={"small"}
            />
            <div className="totalTitle">Total Due</div>
            <div className="totalText">₹ {totalDueAmount}</div>
            <div className={"errorText"}>
                {`Your payment is now N days overdue. 
                  We kindly request that you immediately satisfy the 
                  balance in order to maintain a good loan relationship 
                  without affecting your loan credit.`}
            </div>
            <Card isHot={false}>
                <div className={"loanInfo-Card-Title"}>Gernal</div>
                <div className={"loanInfo-Card-list"}>
                    <ListItem
                        title={"State"}
                        text={<Tag status={status ? status : "EXTEND"}>{status}</Tag>}
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
                        text={`₹ ${paidAmount}`}
                    />
                    <ListItem title={"Balance"} text={`₹ ${balance}`} />
                </div>
                {extended && (
                    <div className={"relatedRepayment"}>
                        <Button
                            onClick={() => setShowExtensionModal(true)}
                            styleType={"link"}
                        >
                            {"Related repayment >"}
                        </Button>
                    </div>
                )}
            </Card>
            {(status === "UNPAID" || status === "OVERDUE") && (
                <div>
                    <div
                        className={"uploadButton"}
                        onClick={props.navigateToUploadPaymentReceiptPage}
                    >
                        <Button>Upload Receipt</Button>
                    </div>
                    <div className={"noticeText"}>
                        After completing the repayment, take a screenshot and
                        uploadyour repayment receipt here.
                    </div>
                </div>
            )}
        </LoanInfoStyled>
    );
};

export default LoanInfo;
