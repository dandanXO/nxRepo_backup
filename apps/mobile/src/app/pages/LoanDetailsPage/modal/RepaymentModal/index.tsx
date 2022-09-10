import React, { useState } from "react";
import styled from "styled-components";
import { Horizontal, NotificationButton, RepayICON, ListItem, Title, Overlay, Radio, Input } from "@frontend/mobile/shared/ui";
const Paragraph = styled.div`
    text-align: left;
    color: #aaaaaa;
    line-height: 16px;
`;
const RepaymentModalContainer = styled.div`
    color: #101010;
`;
const SectionBalance = styled.div`
    padding: 10px;
`;
const SectionOptions = styled.div`
    padding: 10px;
`;
const SectionParagraph = styled.div`
    margin-bottom: 10px;
`;

const SectionButton = styled.div`
    margin-bottom: 10px;
`;
const SectionButton2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RepayAndApplyButton = styled(NotificationButton)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #fff;
`;

const RepaymentCancelButton = styled(NotificationButton)`
    background: #fff0de;
    color: #f58b10;
    flex: 1 0 auto;
    margin-right: 12px;
`;

const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
    background: #fcc76e;
`;

interface RepaymentModalProps {
    balance: number;
    setRepayBalance: React.Dispatch<React.SetStateAction<number>>;
    setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: any;
}
const RepaymentModal = (props: RepaymentModalProps) => {
    const balance = props.balance;
    const [balanceValue, setBalanceValue] = useState(String("₹" + balance));
    const [radioValue, setRadioValue] = useState("balance");
    const handleConfirm = () => {
        props.handlePostRepayCreate(
            false,
            false,
            Number(balanceValue.replace("₹", ""))
        );
        props.setShowRepaymentModal(false);
    };
    return (
        <div>
            <Overlay
                show={true}
                content={(hide: () => void) => {
                    return (
                        <RepaymentModalContainer>
                            <Title>Repayment</Title>
                            <Horizontal />

                            <SectionBalance>
                                <ListItem
                                    title="Balance"
                                    text={`₹ ${balance}`}
                                />
                            </SectionBalance>

                            <Horizontal />

                            <SectionOptions>
                                <Radio.Group
                                    value={radioValue}
                                    onCheck={(value: any) => {
                                        setRadioValue(value);
                                        if (value === "balance") {
                                            setBalanceValue("₹" + balance);
                                        }
                                    }}
                                >
                                    <Radio value="balance">Balance</Radio>
                                    <Radio value="custom">Custom Amount</Radio>
                                </Radio.Group>

                                <Input
                                    label="Amount"
                                    labelType="right"
                                    value={balanceValue}
                                    disabled={radioValue === "balance"}
                                    onChange={(event: any) => {
                                        const value =
                                            event.target.value.replaceAll(
                                                "₹",
                                                ""
                                            );
                                        setBalanceValue("₹" + value);
                                        props.setRepayBalance(value);
                                    }}
                                />
                                <SectionParagraph>
                                    <Paragraph>Attention:</Paragraph>
                                    <Paragraph>
                                        1. Before repayment, please make sure
                                        that youhave enough balance on your bank
                                        account.
                                    </Paragraph>
                                    <Paragraph>
                                        2. In order to protect your rights, we
                                        strongly recommend you take a screenshot
                                        and upload your UTR number after
                                        completing the repayment and return to
                                        the APP to upload your repayment
                                        receipt.
                                    </Paragraph>
                                </SectionParagraph>
                                <SectionButton>
                                    <RepayAndApplyButton
                                        onClick={() => {
                                            props.setShowRepaymentModal(false);
                                            props.setShowRepaymentNoticeModal(
                                                true
                                            );
                                        }}
                                    >
                                        <RepayICON /> Repay and Apply Again
                                    </RepayAndApplyButton>
                                </SectionButton>
                                <SectionButton2>
                                    <RepaymentCancelButton
                                        onClick={() =>
                                            props.setShowRepaymentModal(false)
                                        }
                                    >
                                        Cancel
                                    </RepaymentCancelButton>
                                    <RepaymentButton onClick={handleConfirm}>
                                        Repayment
                                    </RepaymentButton>
                                </SectionButton2>
                            </SectionOptions>
                        </RepaymentModalContainer>
                    );
                }}
            ></Overlay>
        </div>
    );
};

export default RepaymentModal;
