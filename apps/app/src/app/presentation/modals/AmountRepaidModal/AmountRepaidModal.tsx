import React from "react";
import styled from "styled-components";
import {
    Overlay,
    ListItem,
    flexCreator,
    Title,
    Divider,
} from "@frontend/mobile/shared/ui";
import { withTranslation, WithTranslation } from "react-i18next";
import { i18nAmountRepaidModal } from "./i18n/translations";
import { GetLoanDetailResponse } from "../../../services/rtk/old/getLoanDetail";
import recordStatusStyleProps from "../../../modules/recordStatusColorMapper";
import { useNavigate, useLocation } from "react-router-dom";
import { stat } from "fs";
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

type AmountRepaidRecordsProps = Pick<GetLoanDetailResponse, "repayRecords"> & {
    // setShowAmountPaidModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

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
const renderRecordList = (props: AmountRepaidRecordsProps) => {

    const { repayRecords = [] } = props;
    return repayRecords?.map((i) => (
        <Record
            repayDate={i.repayDate ? i.repayDate : ""}
            repayAmount={i.repayAmount ? i.repayAmount : 0}
            repayType={i.repayType ? i.repayType : ""}
        />
    ));
};

const AmountRepaidModal = (props: AmountRepaidRecordsProps) => {
    const { repayRecords, t } = props;
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log('state',state)
    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <div>
                            <Title>{t("Amount RePaid Record")}</Title>
                            <Divider styleType="narrow" />
                            {state.repayRecords?.length === 0 ? (
                                <NoDataStyled>{t("No paid records yet")}</NoDataStyled>
                            ) : (
                                <ModalContentStyled>
                                    {renderRecordList(state.repayRecords)}
                                </ModalContentStyled>
                            )}
                        </div>
                    );
                }}
                onCancel={() => navigate('/loan-record-detail')}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nAmountRepaidModal.namespace)(AmountRepaidModal);
