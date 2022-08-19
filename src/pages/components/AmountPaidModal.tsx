import Modal from "../../core/components/Modal";
import Overlay from "../../core/components/Overlay"
import React from "react";
import styled from "styled-components";
import ListItem from "../../core/components/ListItem";
import { GetLoanDetailResponse } from "../../api/getLoanDetail";
import { flexCreator } from "../../core/components/utils";
import Title from "../../core/components/Modal/Title";
import Horizontal from "../../core/components/Modal/Horizontal";
import Divider from "../../core/components/Divider";

const ModalContentStyled = styled.div`
    padding:0 12px;
`;
const RecordStyled = styled.div`
   ${flexCreator("column", "center", "center")};
   padding-top: 7px;
   .recordStatus{
    width: 100%;
    ${flexCreator("row", "space-between", "center")};
    color:${({ theme }) => theme.color.gray500};
    margin-top: -12px;
    padding-bottom: 12px;
   }
`;

type  AmountPaidRecordsProps = Pick<GetLoanDetailResponse, "repayRecords" > 

const Record = (props: { repayDate: string, repayAmount: number, balance: number }) => {
    const { repayDate, repayAmount, balance } = props;
    return (

        <RecordStyled>
            <ListItem title={repayDate} text={repayAmount} />
            <div className={`recordStatus`}>
                <div>Status</div>
                <div>{`balance ₹ ${balance}`}</div>
            </div>
            <Divider styleType="narrow"/>
        </RecordStyled>

    )

}
const render = (props: AmountPaidRecordsProps) => {
    const { repayRecords } = props;
    return [...repayRecords].map(i => <Record repayDate={i.repayDate} repayAmount={i.repayAmount} balance={i.balance} />)
}
const AmountPaidModal = (props: AmountPaidRecordsProps) => {
    const { repayRecords } = props;
    console.log(repayRecords)
    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (<div>
                        <Title>Amoun Paid record</Title>
                        <Divider styleType="narrow"/>
                        <ModalContentStyled>{render(props)}</ModalContentStyled>
                    </div>)
                }}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
}

export default AmountPaidModal
