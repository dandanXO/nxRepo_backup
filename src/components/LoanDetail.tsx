import styled from "styled-components";
import React from "react";
import {
    mockGetLoanDetailResponse,
    GetLoanDetailChargeFeeDetail,
    GetLoanDetailChargeFeeDetailItems,
    GetLoanDetailResponse,
} from "../api/getLoanDetail";
import ListItem from "../core/components/ListItem";
import Button from "../core/components/Button";
import Accordion from "../core/components/Accordion";
import Divider from "../core/components/Divider";
import Card from "../core/components/Card";
import { convertCompilerOptionsFromJson } from "typescript";

const LoanDetailStyled = styled.div`
    text-align: center;

    .textTitle {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        width: 100%;
        margin-bottom: 16px;
        text-align: left;
    }
    .detailsContent {
        padding-bottom: 4px;
    }

    .noticeText {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        text-align: left;
        padding: 0px 14px;
    }
    .payButtons {
        display: flex;
        justify-content: space-between;
        padding: 0 14px;
    }
    .extendButton {
        flex-basis: 30%;
    }
    .repayButton {
        flex-basis: 65%;
    }
`;

type LoanDetailProps = Pick<
    GetLoanDetailResponse,
    | "chargeFeeDetail"
    | "loanAmount"
    | "serviceCharge"
    | "dailyFee"
    | "reductionAmount"
    | "penaltyInterest"
    | "applyDate"
    | "dueDate"
    | "bankCardNo"
> & {
    setShowExtendModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderDetailContent = (props: GetLoanDetailChargeFeeDetail) => {
    const { items = [] } = props || {};
    return (
        <div className={"detailsContent"}>
            {
                items.map(item => {
                    const fieldType = item.fieldType === "CURRENCY" ? " ₹ " : "";
                    return <ListItem title={item.itemName} text={`${fieldType}${item.value}`} />
                })
            }
        </div>
    );
};

const LoanDetail = (props: LoanDetailProps) => {
    const { chargeFeeDetail, setShowExtendModal, setShowRepaymentModal } =
        props;
    return (
        <LoanDetailStyled>
            <Card isHot={false}>
                <Accordion title={chargeFeeDetail?.title} isCollapse={true}>
                    {renderDetailContent(props.chargeFeeDetail)}
                </Accordion>
            </Card>
            <div className={"noticeText"}>
                <p> Attention： </p>
                <p>
                    1. Before repayment, please make sure that you have enough
                    balance on your bank account.
                </p>
                <p>
                    2. Overdue for more than N days will not be able to extend
                    or re-loan，please ensure you make repayments on time to
                    maintain uninterrupted access to our services.
                </p>
                <p>
                    3. Email us if you have any questions about your
                    responsibilities or for more information. mail@mail.com
                </p>
            </div>
            <div className={"payButtons"}>
                <Button
                    onClick={() => setShowExtendModal(true)}
                    className={"extendButton"}
                    styleType="secondary"
                >
                    Extend
                </Button>
                <Button
                    onClick={() => setShowRepaymentModal(true)}
                    className={"repayButton"}
                    styleType="primary"
                >
                    Repay
                </Button>
            </div>
        </LoanDetailStyled>
    );
};

export default LoanDetail;
