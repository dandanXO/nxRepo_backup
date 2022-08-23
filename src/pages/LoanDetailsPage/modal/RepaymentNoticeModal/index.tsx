import Modal from "../../../../core/components/Modal";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
`;
const Paragraph = styled.div`
    margin-bottom: 10px;
`;

interface RepaymentNoticeModalProps {
    setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: any;
    balance: number;
}
const RepaymentNoticeModal = (props: RepaymentNoticeModalProps) => {
    const handleConfirm = () => {
        console.log(props.balance);
        props.handlePostRepayCreate(false, true, props.balance);
        props.setShowRepaymentNoticeModal(false);
    };
    return (
        <div>
            <Modal
                mask={true}
                show={true}
                type="confirm"
                title="Notice"
                content={
                    <Container>
                        <Paragraph>
                            Dear customer, thank you for your trust and prompt
                            repayment.
                        </Paragraph>
                        <Paragraph>
                            We have received your loan application again, and we
                            will process it as soon as possible.
                        </Paragraph>
                        <Paragraph>
                            After you have completed the repayment, you can
                            return to APP and check all the loan history on the
                            Loan Record page.
                        </Paragraph>
                    </Container>
                }
                confirmText="Repay"
                onConfirm={handleConfirm}
                // NOTE: 特製版
                enableIcon={false}
                enableTitleHorizontal={true}
            ></Modal>
        </div>
    );
};

export default RepaymentNoticeModal;
