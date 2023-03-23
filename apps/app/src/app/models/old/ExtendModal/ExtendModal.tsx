import React from "react";
import styled from "styled-components";
import {
    Overlay,
    Title,
    Divider,
    Button,
    ListItem,
} from "@frontend/mobile/shared/ui";
import {environment} from "../../../../environments/environment";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nExtendModal} from "./i18n/translations";
import {GetLoanDetailRepayConfirmDetail} from "../../../api/old/getLoanDetail";

const ModalContentStyled = styled.div`
    padding: 0 12px;
    .hintText {
        color: ${({ theme }) => theme.color.red};
        margin-bottom: 12px;
        .itemText {
            color: ${({ theme }) => theme.color.red};
        }
    }

    .sectionButtons {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        .cancelButton {
            flex: 1 3;
            margin-right: 12px;
        }
        .confirmButton {
            flex: 3 1;
        }
    }
`;

// interface PureExtendModalProps {
//     currentProps: any;
//     handlePostRepayCreate: any;
// }
type PureExtendModalProps = {
    repayConfirmDetail?: GetLoanDetailRepayConfirmDetail;
    setShowExtendModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: (isExtend: boolean, isForceApplyAfterRepay: boolean, repayAmount: number) => void;
} & WithTranslation;

export const PureExtendModal = (props: PureExtendModalProps) => {
    const {
        // repayConfirmDetail = {
        //     extendDate: "",
        //     extensionFee: "",
        //     extensionPayAmount: "",
        //     paidAmount: "",
        //     penaltyInterest: "",
        //     reductionAmount: "",
        // },
        setShowExtendModal,
        handlePostRepayCreate,
        t,
    } = props;

    const handleConfirm = () => {
        handlePostRepayCreate(
            true,
            false,
            props.repayConfirmDetail &&
                props.repayConfirmDetail.extensionPayAmount
                ? props.repayConfirmDetail.extensionPayAmount
                : 0
        );
        setShowExtendModal(false);
    };

    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <ModalContentStyled>
                            <Title>{t("Extend")}</Title>
                            <Divider />
                            <ListItem
                                title={t("Extension Fee") as string}
                                text={`${environment.currency} ${
                                    props?.repayConfirmDetail?.extensionFee ??
                                    ""
                                }`}
                            />
                            <ListItem
                                title={t("Amount Paid") as string}
                                text={`${environment.currency} ${
                                    props?.repayConfirmDetail?.paidAmount ?? ""
                                }`}
                            />
                            <ListItem
                                title={t("Penalty Interest") as string}
                                text={`${environment.currency} ${
                                    props?.repayConfirmDetail
                                        ?.penaltyInterest ?? ""
                                }`}
                            />
                            <ListItem
                                title={t("Reduction Amount") as string}
                                text={`${environment.currency} ${
                                    props?.repayConfirmDetail
                                        ?.reductionAmount ?? ""
                                }`}
                            />
                            <ListItem
                                title={t("Total Amount") as string}
                                text={`${environment.currency} ${
                                    props?.repayConfirmDetail
                                        ?.extensionPayAmount ?? ""
                                }`}
                            />
                            <Divider />
                            <div className={"hintText"}>
                                <ListItem
                                    title={t("Extension due date") as string}
                                    text={`${environment.currency} ${
                                        props?.repayConfirmDetail?.extendDate ??
                                        ""
                                    }`}
                                />
                            </div>
                            <div className={"sectionButtons"}>
                                <Button
                                    onClick={() => setShowExtendModal(false)}
                                    className={"cancelButton"}
                                    styleType="secondary"
                                >
                                  {t("Cancel")}
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className={"confirmButton"}
                                    styleType="primary"
                                >
                                  {t("Confirm")}
                                </Button>
                            </div>
                        </ModalContentStyled>
                    );
                }}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nExtendModal.namespace)(PureExtendModal);
