import React from "react";
import styled from "styled-components";
import {
    Overlay,
    flexCreator,
    ListItem,
} from "@frontend/mobile/shared/ui";
import { withTranslation, WithTranslation } from "react-i18next";
import { i18nAmountRepaidModal } from "./i18n/translations";
import { GetLoanDetailResponse } from "../../../api/rtk/old/getLoanDetail";
import recordStatusStyleProps from "../../../modules/recordStatusColorMapper";
import {useLocation, useNavigate} from "react-router";
import {PagePathEnum} from "../../pages/PagePathEnum";
import Divider from "../../components/Divider";
import moment from "moment";
import Money from "../../components/Money.tsx";
const ModalContentStyled = styled.div`
    padding: 0 12px;
`;

const RecordStyled = styled.div<RecordStyledProps>`
    margin: 0 16px -8px 16px ;
    font-size: 12px;
    .recordStatus {
        width: 100%;
        ${flexCreator("row", "flex-end", "center")};
        ${(props) => ({ ...recordStatusStyleProps[props.status] })}
        margin-top: -8px;
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
    repayAmount: React.ReactElement;
    repayType: string;
}) => {
    const { repayDate, repayAmount, repayType } = props;
    return (
        <>
            <RecordStyled status={repayType}>
                <div className={`flex justify-between my-1 text-black text-xs `} >
                    <div>{repayDate}</div>
                    <div>{repayAmount}</div>
                </div>
                <div className={`recordStatus`}>
                    <div>{repayType}</div>
                </div>
            </RecordStyled>
            <Divider />
        </>
       
    );
};
const renderRecordList = (props: AmountRepaidRecordsProps) => {
    console.log("props", props);
    const { repayRecords = [] } = props;
    return repayRecords?.map((i) => (
        <Record
            repayDate={i.repayDate ? moment(i.repayDate).format("DD-MM-YYYY") : ""}
            repayAmount={<Money money={i.repayAmount ? i.repayAmount : 0}/>}
            repayType={i.repayType ? i.repayType : ""}
        />
    ));
};

const AmountRepaidModal = (props: AmountRepaidRecordsProps) => {
    const { repayRecords, t } = props;
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log('AmountRepaidModal.state',state)
    console.log('AmountRepaidModal.props',props)

    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                contentNoStyle={true}
                content={(hide: () => void) => {
                    return (
                        <div>
                             <div className="text-sm font-bold mt-[-10px]">{t("Amount Repaid Record")}</div>
                            <Divider/>
                            {state.repayRecords?.length === 0 ? (
                                <NoDataStyled>{t("No paid records yet")}</NoDataStyled>
                            ) : (
                                <ModalContentStyled>
                                    {renderRecordList(state)}
                                </ModalContentStyled>
                            )}
                        </div>
                    );
                }}
                onCancel={() => navigate(PagePathEnum.RepaymentDetailPage)}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nAmountRepaidModal.namespace)(AmountRepaidModal);
