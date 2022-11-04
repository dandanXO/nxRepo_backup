import React from "react";
import styled from "styled-components";
import { GetLoanDetailRecommendProducts } from "../../api/getLoanDetail";
import { Overlay, Title, Divider, Button } from "@frontend/mobile/shared/ui";
const ModalContentStyled = styled.div`
    padding: 0 12px;
    .productName {
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSize[18]};
        color: ${({ theme }) => theme.color.black};
        margin-bottom: 24px;
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
const Paragraph = styled.div`
    margin-bottom: 10px;
`;

export interface PureSubmitOrderModalProps {
    productDetails?: GetLoanDetailRecommendProducts;
    setShowSubmitOrdereModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoanSubmitOrder: (productId: number) => void;
}
export const PureSubmitOrderModal = (props: PureSubmitOrderModalProps) => {
    const handleConfirm = () => {
        props.handleLoanSubmitOrder(
            props.productDetails && props.productDetails.productId
                ? props.productDetails.productId
                : 0
        );
        window["SyncTask"] &&
        window["SyncTask"]["doExecuteSyncContactsTask"] &&
        window["SyncTask"]["doExecuteSyncContactsTask"]();
    };
    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <ModalContentStyled>
                            <Title>Loan Application</Title>
                            <Divider />
                            Selected product
                            <div className="productName">
                                {props?.productDetails?.productName ?? ""}
                            </div>
                            <Paragraph>
                                Are you sure you want to submit this loan
                                application?
                            </Paragraph>
                            <Paragraph>
                                The loan amount you can borrow based on the
                                application information you submitted
                            </Paragraph>
                            <div className={"sectionButtons"}>
                                <Button
                                    onClick={() =>
                                        props.setShowSubmitOrdereModal(false)
                                    }
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

const SubmitOrderModal = (props: PureSubmitOrderModalProps) => {
    return (
        <PureSubmitOrderModal
            productDetails={props?.productDetails}
            setShowSubmitOrdereModal={props.setShowSubmitOrdereModal}
            handleLoanSubmitOrder={props.handleLoanSubmitOrder}
        />
    );
};

export default SubmitOrderModal;
