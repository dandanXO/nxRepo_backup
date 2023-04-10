import styled from "styled-components";
import React from "react";
import {Accordion, ListItem} from "@frontend/mobile/shared/ui";
import Card from "../Card";
import {GetLoanDetailChargeFeeDetail, GetLoanDetailResponse} from "../../../api/rtk/old/getLoanDetail";
import {environment} from "../../../../environments/environment";

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
    | "extendable"
>

const renderDetailContent = (props?: GetLoanDetailChargeFeeDetail) => {
    const { items = [] } = props || {};
    return (
        <div className={"detailsContent"}>
            {items.map((item) => {
                const fieldType = item.fieldType === "CURRENCY" ? ` ${environment.currency} ` : "";
                return (
                    <ListItem
                        title={item.itemName}
                        text={`${fieldType}${item.value}`}
                    />
                );
            })}
        </div>
    );
};

const LoanDetail = (props: LoanDetailProps) => {
    const { chargeFeeDetail } = props;
    return (
        <LoanDetailStyled>
            <Card isHot={false}>
                <Accordion
                    title={
                        chargeFeeDetail && chargeFeeDetail.title
                            ? chargeFeeDetail.title
                            : ""
                    }
                    isCollapse={true}
                >
                    {renderDetailContent(props.chargeFeeDetail)}
                </Accordion>
            </Card>


        </LoanDetailStyled>
    );
};

export default LoanDetail;
