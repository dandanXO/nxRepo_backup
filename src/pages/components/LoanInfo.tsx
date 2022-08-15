import styled from "styled-components";
import React from "react";
import { mockGetLoanDetailResponse, GetLoanDetailResponse } from "../../api/getLoanDetail";
import Tag from "../../core/components/Tag";
import Card from "../../core/components/Card";
import ListItem from "../../core/components/ListItem";
import Button from "../../core/components/Button";
import LoanBrand from "../../core/components/LoanBrand";

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

type LoanInfoProps = Pick<GetLoanDetailResponse, "iconUrl" |"productName" |"status" | "paidAmount" | "balance">;

const fileIcon = require("../../core/components/images/fileIcon.jpg");
const LoanInfo = (props: LoanInfoProps) => {
    const { status, paidAmount, balance, iconUrl, productName } = props;
    return (
        <LoanInfoStyled>
            <LoanBrand iconUrl={fileIcon} productName={productName} sizeType={'small'}/>
            <div className="totalTitle">Total Due</div>
            <div className="totalText">₹ {balance}</div>
            <div className={"errorText"}>
                {`Your payment is now N days overdue. 
                  We kindly request that you immediately satisfy the 
                  balance in order to maintain a good loan relationship 
                  without affecting your loan credit.`}
            </div>
            <Card isHot={false}>
                <div className={"loanInfo-Card-Title"}>Gernal</div>
                <ListItem title={"State"} text={<Tag status={status}>{status}</Tag>} />
                <ListItem
                    title={
                        <div>
                            <div>Amount Paid</div>
                            <div><img src={fileIcon} /></div>
                        </div>
                    }
                    text={`₹ ${paidAmount}`}
                />
                <ListItem title={"Balance"} text={`₹ ${balance}`} />
                <div className={"relatedRepayment"} ><Button styleType={'link'}>{'Related repayment >'}</Button></div>
            </Card>
            {
                (status === "UNPAID" || status === "OVERDUE") &&
                <div>
                    <div className={"uploadButton"}><Button>Upload Receipt</Button></div>
                    <div className={"noticeText"}>After completing the repayment, take a screenshot and uploadyour repayment receipt here.</div>
                </div>
            }
            
        </LoanInfoStyled>
    );
};

export default LoanInfo;
