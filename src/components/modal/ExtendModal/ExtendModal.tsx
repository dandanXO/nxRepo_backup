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
    setShowExtendModal?: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate?: any;
}
export const PureExtendModal = (props: PureExtendModalProps) => {
    const { repayConfirmDetail, setShowExtendModal, handlePostRepayCreate } =
        props;
    const {
        extendDate,
        extensionFee,
        extensionPayAmount,
        paidAmount,
        penaltyInterest,
        reductionAmount,
    } = repayConfirmDetail;

    const handleConfirm = () => {
        handlePostRepayCreate(true, false, extensionPayAmount);
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
                                text={`₹ ${extensionFee ? extensionFee : ""}`}
                            />
                            <ListItem
                                title={"Amount Paid"}
                                text={`- ₹ ${paidAmount ? paidAmount : ""}`}
                            />
                            <ListItem
                                title={"Penalty Interest"}
                                text={`₹ ${
                                    penaltyInterest ? penaltyInterest : ""
                                }`}
                            />
                            <ListItem
                                title={"Reduction Amount"}
                                text={`₹ ${
                                    reductionAmount ? reductionAmount : ""
                                }`}
                            />
                            <ListItem
                                title={"Total Amount"}
                                text={`₹ ${
                                    extensionPayAmount ? extensionPayAmount : ""
                                }`}
                            />
                            <Divider />
                            <div className={"hintText"}>
                                <ListItem
                                    title={"Extension due date"}
                                    text={extendDate ? extendDate : ""}
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
            // currentProps={...props}
            {...props}
            handlePostRepayCreate={props.handlePostRepayCreate}
        />
    );
};

export default ExtendModal;
