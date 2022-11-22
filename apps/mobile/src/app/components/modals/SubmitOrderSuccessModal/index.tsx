import { Modal } from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nSubmitOrderSuccessModal} from "./i18n/translations";

const Container = styled.div`
    padding: 0 20px;
`;
const Paragraph = styled.div`
    margin-bottom: 10px;
`;

type RepaymentNoticeModalProps = {
    setShowSubmitOrderSuccessModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
} & WithTranslation;

const SubmitOrderSuccessModal = (props: RepaymentNoticeModalProps) => {
    return (
        <div>
            <Modal
                mask={true}
                show={true}
                type={"confirm"}
                title={props.t("Successfully Submitted") as string}
                content={
                    <Container>
                        <Paragraph>
                          {props.t("Your submission has been received.")}
                        </Paragraph>
                        <Paragraph>
                          {props.t("Please wait while the loan is being reviewed.")}
                        </Paragraph>
                        <Paragraph>
                          {props.t("You can check all the loan history on the Loan Record page later.")}
                        </Paragraph>
                    </Container>
                }
                confirmText={props.t("OK") as string}
                onConfirm={() => props.setShowSubmitOrderSuccessModal(false)}
                // NOTE: 特製版
                enableIcon={false}
                enableTitleHorizontal={true}
            ></Modal>
        </div>
    );
};

export default withTranslation(i18nSubmitOrderSuccessModal.namespace)(SubmitOrderSuccessModal);
