import Overlay from "../../../core/components/Overlay";
import React from "react";
import styled from "styled-components";
import ListItem from "../../../core/components/ListItem";
import { GetLoanDetailResponse } from "../../../api/getLoanDetail";
import { flexCreator } from "../../../core/components/utils";
import Title from "../../../core/components/Modal/Title";
import Divider from "../../../core/components/Divider";
import recordStatusStyleProps from "../../recordStatusColorMapper";

const ModalContentStyled = styled.div`
    padding: 0 12px;
`;

const RecordStyled = styled.div<RecordStyledProps>`
    ${flexCreator("column", "center", "center")};
    padding-top: 7px;
    .recordStatus {
        width: 100%;
        ${flexCreator("row", "flex-end", "center")};
        ${(props) => ({ ...recordStatusStyleProps[props.status] })}
        margin-top: -12px;
        padding-bottom: 12px;
        text-align: right;
    }
`;

const NoDataStyled = styled.div`
    height: 200px;
    ${flexCreator("row", "center", "center")};
`;

type AmountPaidRecordsProps = Pick<GetLoanDetailResponse, "repayRecords"> & {
    setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
};

interface RecordStyledProps {
    status: string;
}
const Record = (props: {
    repayDate: string;
    repayAmount: number;
    repayType: string;
}) => {
    const { repayDate, repayAmount, repayType } = props;
    return (
        <RecordStyled status={repayType}>
            <ListItem title={repayDate} text={repayAmount} />
            <div className={`recordStatus`}>
                <div>{repayType}</div>
            </div>
            <Divider styleType="narrow" />
        </RecordStyled>
    );
};
const renderRecordList = (props: AmountPaidRecordsProps) => {
    const { repayRecords } = props;
    return repayRecords.map((i) => (
        <Record
            repayDate={i.repayDate}
            repayAmount={i.repayAmount}
            repayType={i.repayType}
        />
    ));
};

const AmountPaidModal = (props: AmountPaidRecordsProps) => {
    const { repayRecords, setShowAmountPaidModal } = props;
    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <div>
                            <Title>Amount Paid Record</Title>
                            <Divider styleType="narrow" />
                            {repayRecords.length === 0 ? (
                                <NoDataStyled>No paid records yet</NoDataStyled>
                            ) : (
                                <ModalContentStyled>
                                    {renderRecordList(props)}
                                </ModalContentStyled>
                            )}
                        </div>
                    );
                }}
                onCancel={() => setShowAmountPaidModal(false)}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default AmountPaidModal;
