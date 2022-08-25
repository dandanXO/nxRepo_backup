import Overlay from "../../../core/components/Overlay";
import React, { useCallback } from "react";
import styled from "styled-components";
import ListItem from "../../../core/components/ListItem";
import {
    GetLoanDetailResponse,
    GetLoanDetailRepayConfirmDetail,
} from "../../../api/getLoanDetail";
import { flexCreator } from "../../../core/components/utils";
import Title from "../../../core/components/Modal/Title";
import Divider from "../../../core/components/Divider";
import Button from "../../../core/components/Button";

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
            flex: 1 0 auto;
            margin-right: 12px;
        }
        .confirmButton {
            flex: 3 0 auto;
        }
    }
`;

// interface PureExtendModalProps {
//     currentProps: any;
//     handlePostRepayCreate: any;
// }
export interface PureExtendModalProps {
    repayConfirmDetail?: GetLoanDetailRepayConfirmDetail;
    setShowExtendModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate?: any;
}
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
    } = props;

    const handleConfirm = () => {
        handlePostRepayCreate(
            true,
            false,
            props.repayConfirmDetail &&
                props.repayConfirmDetail.extensionPayAmount
                ? props.repayConfirmDetail.extensionPayAmount
                : ""
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
                            <Title>Amoun Paid record</Title>
                            <Divider />
                            <ListItem
                                title={"Extension Fee"}
                                text={`₹ ${
                                    props?.repayConfirmDetail?.extensionFee ??
                                    ""
                                }`}
                            />
                            <ListItem
                                title={"Amount Paid"}
                                text={`₹ ${
                                    props?.repayConfirmDetail?.paidAmount ?? ""
                                }`}
                            />
                            <ListItem
                                title={"Penalty Interest"}
                                text={`₹ ${
                                    props?.repayConfirmDetail
                                        ?.penaltyInterest ?? ""
                                }`}
                            />
                            <ListItem
                                title={"Reduction Amount"}
                                text={`₹ ${
                                    props?.repayConfirmDetail
                                        ?.reductionAmount ?? ""
                                }`}
                            />
                            <ListItem
                                title={"Total Amount"}
                                text={`₹ ${
                                    props?.repayConfirmDetail
                                        ?.extensionPayAmount ?? ""
                                }`}
                            />
                            <Divider />
                            <div className={"hintText"}>
                                <ListItem
                                    title={"Extension due date"}
                                    text={`₹ ${
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
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className={"confirmButton"}
                                    styleType="primary"
                                >
                                    Confirm
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

type ExtendModalProps = Pick<GetLoanDetailResponse, "repayConfirmDetail"> & {
    setShowExtendModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: any;
};

const ExtendModal = (props: ExtendModalProps) => {
    return (
        <PureExtendModal
            repayConfirmDetail={props?.repayConfirmDetail}
            handlePostRepayCreate={props.handlePostRepayCreate}
            setShowExtendModal={props.setShowExtendModal}
        />
    );
};

export default ExtendModal;
