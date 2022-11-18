import React from "react";
import styled from "styled-components";
import { GetLoanDetailResponse } from "../../../api/getLoanDetail";
import recordStatusStyleProps from "../../../core/recordStatusColorMapper";
import {
    Overlay,
    ListItem,
    flexCreator,
    Title,
    Divider,
} from "@frontend/mobile/shared/ui";

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
    return repayRecords?.map((i) => (
        <Record
            repayDate={i.repayDate ? i.repayDate : ""}
            repayAmount={i.repayAmount ? i.repayAmount : 0}
            repayType={i.repayType ? i.repayType : ""}
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
                            {repayRecords?.length === 0 ? (
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
