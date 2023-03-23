import React from "react";
import styled from "styled-components";
import { GetLoanDetailRecommendProducts } from "../../../api/getLoanDetail";
import { Overlay, Title, Divider, Button } from "@frontend/mobile/shared/ui";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nSubmitOrderModal} from "./i18n/translations";

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

export type PureSubmitOrderModalProps = {
    productDetails?: GetLoanDetailRecommendProducts;
    setShowSubmitOrdereModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoanSubmitOrder: (productId: number) => Promise<string>;
} & WithTranslation;

export const PureSubmitOrderModal = (props: PureSubmitOrderModalProps) => {
    // const {startRequest, isRequestPending, endRequest} = useLockRequest("handleLoanSubmitOrder");

    const handleConfirm = () => {
      // if(isRequestPending("handleLoanSubmitOrder")) {
      //   return
      // } else {
      //   startRequest("handleLoanSubmitOrder")
      // }
        props.handleLoanSubmitOrder(
            props.productDetails && props.productDetails.productId
                ? props.productDetails.productId
                : 0
        ).then(()=> {
          // @ts-ignore
          window["SyncTask"] &&
          // @ts-ignore
          window["SyncTask"]["doExecuteSyncContactsTask"] &&
          // @ts-ignore
          window["SyncTask"]["doExecuteSyncContactsTask"]();

        }).finally(() => {
          // endRequest("handleLoanSubmitOrder");
        })
    };
    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <ModalContentStyled>
                            <Title>{props.t("Loan Application")}</Title>
                            <Divider />
                            {props.t("Selected product")}
                            <div className="productName">
                                {props?.productDetails?.productName ?? ""}
                            </div>
                            <Paragraph>
                              {props.t("Are you sure you want to submit this loan application?")}
                            </Paragraph>
                            <Paragraph>
                              {props.t("The loan amount you can borrow based on the application information you submitted")}
                            </Paragraph>
                            <div className={"sectionButtons"}>
                                <Button
                                    onClick={() =>
                                        props.setShowSubmitOrdereModal(false)
                                    }
                                    className={"cancelButton"}
                                    styleType="secondary"
                                >
                                  {props.t("Cancel")}
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className={"confirmButton"}
                                    styleType="primary"
                                >
                                  {props.t("Confirm")}
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

export default withTranslation(i18nSubmitOrderModal.namespace)(PureSubmitOrderModal);
