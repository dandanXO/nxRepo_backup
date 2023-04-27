import React, { useEffect } from "react";
import { Overlay } from "@frontend/mobile/shared/ui";
import { environment } from "../../../../../../environments/environment";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nExtendModal } from "../../i18n/translations";
import { useNavigate, useLocation } from "react-router";
import ListItem from "../../../../components/ListItem";
import Divider from "../../../../components/Divider";
import useExtendCreate from "../../../../hooks/useExtendCreate";
import useRepayTypes from "../../../../hooks/useRepayTypes";
import moment from "moment";
import { getOrderNo } from "../../../../../modules/location/getOrderNo";
import { Button } from "../../../../components/layouts/Button";


const IndiaExtendModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = props;
    const { productName = '', dueDate = '', overdueDays = '', penaltyInterest = '', extendDate = '', extensionFee = '', repayConfirmDetail = {} } = location.state.currentData ?? {};
    const orderNo = location.state.currentData?.orderNo || getOrderNo();
    const { handlePostExpendCreate } = useExtendCreate();

    const { triggerGetList, isRepayTypesFetching, repayTypesList, repayType, setRepayType } = useRepayTypes();
    useEffect(() => {
        triggerGetList({ orderNo: orderNo });
    }, [])

    const handleConfirm = () => {
        handlePostExpendCreate && handlePostExpendCreate(
            false,
            orderNo,
            repayConfirmDetail &&
                repayConfirmDetail.extensionPayAmount
                ? repayConfirmDetail.extensionPayAmount
                : 0,
            repayType && repayType.type
        );
    };

    return (

        <div className={`p-2`}>
            <div className="text-xl font-bold mb-4">Extend</div>
            <ListItem title={t("Product") as string} text={productName ?? ""} />
            <ListItem title={t("No.") as string} text={orderNo ?? ""} />
            <ListItem title={t("Due Date") as string} text={dueDate ? moment(dueDate).format("MM-DD-YYYY") : ''} />
            <ListItem title={t("Overdue Days") as string} text={overdueDays ?? ""} />
            <ListItem title={t("Overdue Fee") as string} text={penaltyInterest ?? ""} />
            <ListItem title={t("Extension Due Date") as string} text={extendDate ?? ""} textColor="text-primary-main" />
            <Divider />
            <ListItem fontWeight="font-bold"
                title={t("Extension Fee") as string}
                text={`${environment.currency} ${extensionFee ?? ""}`}
            />
            <div className={`flex flex-row mt-6`}>
                <div className={`grow mr-1.5`}>
                    <Button onClick={() => navigate(-2)} text={'Cancel'} className={`bg-primary-variant w-full text-white`} />
                </div>
                <div className={`grow ml-1.5`} >
                    <Button onClick={handleConfirm} text={'Confirm'} className={`bg-primary-main w-full text-white`} />
                </div>
            </div>
        </div>
    );
};

export default withTranslation(i18nExtendModal.namespace)(IndiaExtendModal);
