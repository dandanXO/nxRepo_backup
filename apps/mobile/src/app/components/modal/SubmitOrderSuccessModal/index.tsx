import {Modal} from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
`;
const Paragraph = styled.div`
    margin-bottom: 10px;
`;

interface RepaymentNoticeModalProps {
    setShowSubmitOrderSuccessModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}
const SubmitOrderSuccessModal = (props: RepaymentNoticeModalProps) => {
    return (
        <div>
            <Modal
                mask={true}
                show={true}
                type="confirm"
                title="Successfully Submitted"
                content={
                    <Container>
                        <Paragraph>
                            Your submission has been received.
                        </Paragraph>
                        <Paragraph>
                            Please wait while the loan is being reviewed.
                        </Paragraph>
                        <Paragraph>
                            You can check all the loan history on the Loan
                            Record page later.
                        </Paragraph>
                    </Container>
                }
                confirmText="Repay"
                onConfirm={() => props.setShowSubmitOrderSuccessModal(false)}
                // NOTE: 特製版
                enableIcon={false}
                enableTitleHorizontal={true}
            ></Modal>
        </div>
    );
};

export default SubmitOrderSuccessModal;
