import React, { useEffect } from "react";
import { Overlay } from "@frontend/mobile/shared/ui";
import { environment } from "../../../../environments/environment";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nExtendModal } from "./i18n/translations";
import { useNavigate, useLocation } from "react-router";
import ListItem from "../../components/ListItem";
import Divider from "../../components/Divider";
import useExtendCreate from "../../hooks/useExtendCreate";
import useRepayTypes from "../../hooks/useRepayTypes";
import moment from "moment";
import {getOrderNo} from "../../../modules/location/getOrderNo";
import {Button} from "../../components/layouts/Button";
import { renderByCountry } from "../../../modules/i18n";
import { IndiaCountry } from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import IndiaExtendModal from "./i18n/IndiaExtendModal";
import PakistanExtendModal from "./i18n/PakistanExtendModal";


const PureExtendModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('extend location', location)

    const { t } = props;

    const { repayConfirmDetail: {extendDate, extensionFee, extensionPayAmount} ,productName = '', dueDate = '', overdueDays = '', penaltyInterest = '', repayConfirmDetail = {} } = location.state.currentData ?? {};
    const orderNo =  location.state.currentData?.orderNo || getOrderNo();
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
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <div className={`p-2`}>
                            <div className="text-xl font-bold mb-4">Extend</div>
                            <ListItem title={t("Product") as string} text={productName ?? ""} />
                            <ListItem title={t("No.") as string} text={orderNo ?? ""} />
                            <ListItem title={t("Due Date") as string} text={dueDate ? moment(dueDate).format("MM-DD-YYYY") :''} />
                            <ListItem title={t("Overdue Days") as string} text={overdueDays ?? ""} />
                            <ListItem title={t("Overdue Fee") as string} text={penaltyInterest ?? ""}  textColor={"text-red-500"}/>
                            <ListItem title={t("Extension Due Date") as string} text={extendDate ?? ""} textColor={"text-red-500"}/>
                            <Divider />
                            <ListItem fontWeight="font-bold"
                                title={t("Extension Fee") as string}
                                text={`${environment.currency} ${extensionPayAmount ?? ""}`}
                            />
                            <div className={`flex flex-row mt-6 text-white`}>
                                <div className={`grow mr-1.5`}>
                                  <Button onClick={()=>navigate(-2)} text={'Cancel'} className={`bg-primary-variant w-full`}/>
                                </div>
                                <div className={`grow ml-1.5`} >
                                  <Button onClick={handleConfirm} text={'Confirm'} className={`bg-primary-main w-full`}/>
                                </div>
                            </div>
                        </div>
                    );
                    // return renderByCountry({
                    //     [IndiaCountry.country]: <IndiaExtendModal currentData={location.state.currentData} />,
                    //     [PakistanCountry.country]: (
                    //         <PakistanExtendModal
                    //             currentData={location.state.currentData}
                    //             repayTypesList={repayTypesList}
                    //             repayType={repayType}
                    //             setRepayType={setRepayType}
                    //             handleConfirm={handleConfirm}
                    //         />
                    //     )
                    // }, <IndiaExtendModal />)
                }}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nExtendModal.namespace)(PureExtendModal);
