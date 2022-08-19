import Modal from "../../core/components/Modal";
import Overlay from "../../core/components/Overlay";
import React from "react";
import styled from "styled-components";
import LoanBrand from "../../core/components/LoanBrand";
import Divider from "../../core/components/Divider";
import ListItem from "../../core/components/ListItem";
import Tag from "../../core/components/Tag";
import AmountPaidIcon from "../../core/components/images/amount_paid_icon.svg";
import Logo from "../../core/components/images/logo.jpg";
import { mockGetLoanDetailResponse, GetLoanDetailResponse } from "../../api/getLoanDetail";


const ExtesionDetailStyled = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.color.black};
   

    .loanBrand{
      
    }
    .totalTitle {
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize[14]};
       
    }
    .totalText {
        font-size: ${({ theme }) => theme.fontSize[26]};
        font-weight: bold;
    }
   
    .loanInfo-Card-Title {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
        width: 100%;
        margin-bottom: 10px;
        text-align: left;
    }
    .loanInfo-Card-list{
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
type ExtesionDetailProps = GetLoanDetailResponse;
const renderExtesionDetail = (props: ExtesionDetailProps) => {
    const { iconUrl = Logo, status, paidAmount, balance, productName, loanAmount, serviceCharge, dailyFee, reductionAmount, penaltyInterest, extensionFee, originalDueDate, extendDate, dueDate, bankCardNo } = props;
    return (
        <ExtesionDetailStyled>
            <div className="loanBrand"><LoanBrand iconUrl={iconUrl} productName={productName} sizeType={'small'} /></div>
            <div className="totalTitle">Amount Paid with Extension</div>
            <div className="totalText">₹ {balance}123132123</div>

            <Divider />
            <div className={"loanInfo-Card-Title"}>Gernal</div>
            <div className={"loanInfo-Card-list"}>
                <ListItem title={"State"} text={<Tag status={status}>{status}</Tag>} />
                <ListItem
                    title={
                        <div>
                            <div>Amount Paid</div>
                            <div><img src={AmountPaidIcon} /></div>
                        </div>
                    }
                    text={`₹ ${paidAmount}`}
                />
                <ListItem title={"Balance"} text={`₹ ${balance}`} />
            </div>
            <Divider />
            <div className={"loanInfo-Card-Title"}>Details</div>
            <ListItem title={'Loan Amount'} text={loanAmount} />
            <ListItem title={'Service Charge'} text={serviceCharge} />
            <ListItem title={'Daily fee'} text={dailyFee} />
            <ListItem title={'Reduction Amount'} text={reductionAmount} />
            <ListItem title={'Penalty Interest'} text={penaltyInterest} />
            <div className={"loanInfo-Card-Title"}>Extension</div>
            <ListItem title={'Extension fee'} text={extensionFee} />
            <Divider />
            <ListItem title={'Original due date'} text={originalDueDate} />
            <ListItem title={'Extension Date'} text={extendDate} />
            <ListItem title={'Due Date'} text={dueDate} />
            <Divider />
            <div className={"loanInfo-Card-Title"}>Link account</div>
            <ListItem title={'Bank card'} text={bankCardNo} />

        </ExtesionDetailStyled>
    )

}

const ExtensionDetailModal = (props: ExtesionDetailProps) => {
    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => renderExtesionDetail(props)}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
}
export default ExtensionDetailModal;
