import { Modal } from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { i18nRepaymentNoticeModal } from "./i18n/translations";

const Container = styled.div`
    padding: 0 20px;
`;
const Paragraph = styled.div`
    margin-bottom: 10px;
`;

type RepaymentNoticeModalProps = {
    setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: any;
    repaymentUseCase: any;
    balance: number;
} & WithTranslation;

const RepaymentNoticeModal = (props: RepaymentNoticeModalProps) => {
    const handleConfirm = () => {
        console.log("[repay] RepaymentNoticeModal.value", props.balance);
        props.handlePostRepayCreate();
        props.repaymentUseCase({
            isExtend: false,
            isForceApplyAfterRepay: true,
            repayAmount: props.balance,
        });
        props.setShowRepaymentNoticeModal(false);
    };
    return (
        <div>
            <Modal
                mask={true}
                show={true}
                type="confirm"
                title={props.t("Notice") as string}
                content={
                    <Container>
                        <Paragraph>
                            {props.t(
                                "Dear customer, thank you for your trust and prompt repayment."
                            )}
                        </Paragraph>
                        <Paragraph>
                            {props.t(
                                "We have received your loan application again, and we will process it as soon as possible."
                            )}
                        </Paragraph>
                        <Paragraph>
                            {props.t(
                                "After you have completed the repayment, you can return to APP and check all the loan history on the Loan Record page."
                            )}
                        </Paragraph>
                    </Container>
                }
                confirmText={props.t("Repay") as string}
                onConfirm={handleConfirm}
                // NOTE: 特製版
                enableIcon={false}
                enableTitleHorizontal={true}
            ></Modal>
        </div>
    );
};

export default withTranslation(i18nRepaymentNoticeModal.namespace)(
    RepaymentNoticeModal
);
