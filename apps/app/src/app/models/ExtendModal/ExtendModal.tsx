import React from "react";
import styled from "styled-components";
import { Overlay } from "@frontend/mobile/shared/ui";
import { environment } from "../../../environments/environment";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nExtendModal } from "./i18n/translations";
import { GetLoanDetailRepayConfirmDetail } from "../../api/old/getLoanDetail";
import { useNavigate ,useLocation} from "react-router-dom";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import Divider from "../../components/Divider";

type PureExtendModalProps = {
    repayConfirmDetail?: GetLoanDetailRepayConfirmDetail;
    // setShowExtendModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate?: (isExtend: boolean, isForceApplyAfterRepay: boolean, repayAmount: number) => void;
} & WithTranslation;

export const PureExtendModal = (props: PureExtendModalProps) => {
    const navigate = useNavigate();

    const location = useLocation();
    console.log('extend location',location)
    const {
        // repayConfirmDetail = {
        //     extendDate: "",
        //     extensionFee: "",
        //     extensionPayAmount: "",
        //     paidAmount: "",
        //     penaltyInterest: "",
        //     reductionAmount: "",
        // },
        // setShowExtendModal,
        handlePostRepayCreate,
        t,
    } = props;

    const handleConfirm = () => {
        handlePostRepayCreate && handlePostRepayCreate(
            true,
            false,
            props.repayConfirmDetail &&
                props.repayConfirmDetail.extensionPayAmount
                ? props.repayConfirmDetail.extensionPayAmount
                : 0
        );
        navigate('/loan-record-detail')
        // setShowExtendModal(false);
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
                            <ListItem
                                title={t("Product") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail?.extensionFee ??
                                    ""
                                    }`}
                            />
                            <ListItem
                                title={t("No.") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail?.paidAmount ?? ""
                                    }`}
                            />
                            <ListItem
                                title={t("Due Date") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail
                                    ?.penaltyInterest ?? ""
                                    }`}
                            />
                            <ListItem
                                title={t("Overdue Days") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail
                                    ?.reductionAmount ?? ""
                                    }`}
                            />
                            <ListItem
                                title={t("Overdue Fee") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail
                                    ?.extensionPayAmount ?? ""
                                    }`}
                            />
                            <ListItem
                                title={t("Extension Due Date") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail
                                    ?.extensionPayAmount ?? ""
                                    }`}
                            />
                            <Divider />
                            <ListItem
                                fontWeight="font-bold"
                                title={t("Extension due date") as string}
                                text={`${environment.currency} ${props?.repayConfirmDetail?.extendDate ??
                                    ""
                                    }`}
                            />
                            <div className={`flex flex-row mt-6`}>
                                <div className={`grow mr-1.5`}><Button onClick={() => navigate(-2)} buttonText={'Cancel'} backgroundColor={'bg-orange-300'} width={`w-full`} /></div>
                                <div className={`grow ml-1.5`} ><Button onClick={handleConfirm} buttonText={'Repay'} width={`w-full`} /></div>
                            </div>
                        </div>
                    );
                }}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nExtendModal.namespace)(PureExtendModal);
