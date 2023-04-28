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
import CustomSelect from "../../../../components/Select";
import Money from "../../../../components/Money.tsx";

type paymentMethodValueType = {
    value: string;
    label: string;
};
const PakistanExtendModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = props;
    const { repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount='' }, orderNo = '', productName = '', dueDate = '', overdueDays = '', penaltyInterest = '' } = props.currentData ?? {};

    return (

        <div className={`p-2`}>
            <div className="text-xl font-bold mb-4">Extend</div>
            <ListItem title={t("Product") as string} text={productName ?? ""} />
            <ListItem title={t("No.") as string} text={orderNo ?? ""} />
            <ListItem title={t("Due Date") as string} text={dueDate ? moment(dueDate).format("MM-DD-YYYY") : ''} />
            <ListItem title={t("Overdue Days") as string} text={overdueDays ?? ""} />
            <ListItem title={t("Overdue Fee") as string} text={penaltyInterest ?? ""} textColor={"text-red-500"} />
            <ListItem title={t("Extension Due Date") as string} text={extendDate ?? ""} textColor={"text-red-500"} />
            <Divider />
            <ListItem fontWeight="font-bold"
                title={t("Extension Fee") as string}
                text={<Money money={extensionPayAmount} />}
            />
            <div className="mt-6  mb-5 bg-gray-200 h-2 mx-[-20px]"></div>
            <div className="text-black text-xs font-bold text-left">{t('Payment Method')}</div>
            <CustomSelect
                type={'standard'}
                options={props.repayTypesList || []}
                value={props?.repayType}
                onChange={(item: any) => {
                    props.setRepayType(item as paymentMethodValueType);
                }}
            />
            <div className={`flex flex-row mt-6 text-white`}>
                <div className={`grow mr-1.5`}>
                    <Button onClick={() => navigate(-2)} text={'Cancel'} className={`bg-primary-variant w-full`} />
                </div>
                <div className={`grow ml-1.5`} >
                    <Button onClick={props.handleConfirm} text={'Confirm'} className={`bg-primary-main w-full`} />
                </div>
            </div>
        </div>
    );
};

export default withTranslation(i18nExtendModal.namespace)(PakistanExtendModal);