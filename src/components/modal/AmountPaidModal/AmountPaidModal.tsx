import Overlay from "../../../core/components/Overlay"
import React from "react";
import styled from "styled-components";
import ListItem from "../../../core/components/ListItem";
import { GetLoanDetailResponse } from "../../../api/getLoanDetail";
import { flexCreator } from "../../../core/components/utils";
import Title from "../../../core/components/Modal/Title";
import Divider from "../../../core/components/Divider";
import theme from "../../../core/components/config/theme";

const ModalContentStyled = styled.div`
    padding:0 12px;
`;

const { color } = theme;

const statusStyleProps: {
    [key: string]: object
} = {
    "extend": {
        color: color.blue,
    }, 
    "pay off":{
        color: color.gray500,
        fontWeight:"bold"
    },
    "partial": {
        color: color.gray500,
    },
    "overdue / pay off": {
        color: color.red100,
        fontWeight:"bold"
    },
    "overdue / partial":{
        color: color.red100,
    },
    "reduction repayment":{
        color: color.blue,
        fontWeight:"bold"
    },
}

const RecordStyled = styled.div<RecordStyledProps>`
   ${flexCreator("column", "center", "center")};
   padding-top: 7px;
   .recordStatus{
    width: 100%;
    ${flexCreator("row", "space-between", "center")};
    ${(props) => ({ ...statusStyleProps[props.status] })}
    /* color:${({ theme }) => theme.color.gray500}; */
    margin-top: -12px;
    padding-bottom: 12px;
   }
 
`;

const NoDataStyled=styled.div`
height: 200px;
${flexCreator("row", "center", "center")};
`;

type  AmountPaidRecordsProps = Pick<GetLoanDetailResponse, "repayRecords" > & {
    setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
};

interface RecordStyledProps {
    status: string,
}
const Record = (props: { repayDate: string, repayAmount: number, balance: number }) => {
    const { repayDate, repayAmount, balance } = props;
    return (

        <RecordStyled status={balance.toString()}>
            <ListItem title={repayDate} text={repayAmount} />
            <div className={`recordStatus`} >
                <div>{balance}</div>
            </div>
            <Divider styleType="narrow"/>
        </RecordStyled>

    )

}
const renderRecordList = (props: AmountPaidRecordsProps) => {
    const { repayRecords } = props;
    return repayRecords.map(i => <Record repayDate={i.repayDate} repayAmount={i.repayAmount} balance={i.balance} />)
}

const NoData=()=>{
    return(
        <NoDataStyled>
            <div>No paid records yet</div>
        </NoDataStyled>
    )
}
const AmountPaidModal = (props: AmountPaidRecordsProps) => {
    const { repayRecords,setShowAmountPaidModal } = props;
    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                content={(hide: () => void) => {
                    return <div>
                        <Title>Amoun Paid record</Title>
                        <Divider styleType="narrow" />
                        {repayRecords.length === 0 ? <NoData /> : <ModalContentStyled>{renderRecordList(props)}</ModalContentStyled>}
                    </div>

                }}
                onCancel={()=>setShowAmountPaidModal(false)}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
}

export default AmountPaidModal
