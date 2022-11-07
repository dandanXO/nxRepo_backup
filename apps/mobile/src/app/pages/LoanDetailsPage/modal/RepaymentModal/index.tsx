import React, { useState } from "react";
import styled from "styled-components";
import AdSVG from "./repayment_banner.svg";

import {
  Horizontal,
  NotificationButton,
  RepayICON,
  ListItem,
  Title,
  Overlay,
  Radio,
  Input, Select,
} from "@frontend/mobile/shared/ui";
import {environment} from "../../../../../environments/environment";
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
const MethodContainer = styled.div`
  margin-bottom: 18px;
`;
const SectionParagraph = styled.div`
    margin-bottom: 10px;
    padding: 10px;
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
    color: ${(props) => props.theme.button.primary.text};
`;

const RepaymentCancelButton = styled(NotificationButton)`
    flex: 1 0 auto;
    margin-right: 12px;
    background: ${(props) => props.theme.button.secondary.main};
    color: ${(props) => props.theme.button.secondary.text};
`;

const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
    background: ${(props) => props.theme.button.info.main};
    color: ${(props) => props.theme.button.info.text};
`;

const BoldText = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 7px;
`
const PaymentMethodContainer = styled.div`
  margin-bottom: 18px;
`

const AdvertisementImg = styled.img.attrs(props => ({
  src: AdSVG
}))``;

interface RepaymentModalProps {
    balance: number;
    setRepayBalance: React.Dispatch<React.SetStateAction<number>>;
    setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlePostRepayCreate: any;
    paymentMethodList: string[];
    setPayType: React.Dispatch<React.SetStateAction<number>>;
}
const RepaymentModal = (props: RepaymentModalProps) => {
    const balance = props.balance;
    const [balanceValue, setBalanceValue] = useState(String(`${environment.currency}` + balance));
    const [radioValue, setRadioValue] = useState("balance");
    const [paymentMethodValue, setPaymentMethodValue] = useState(0);

    const handleConfirm = () => {
        props.handlePostRepayCreate(
            false,
            false,
            Number(balanceValue.replace(`${environment.currency}`, ""))
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
                                    text={`${environment.currency} ${balance}`}
                                />
                            </SectionBalance>


                            <SectionOptions>

                                <MethodContainer>
                                  <Radio.Group
                                    value={radioValue}
                                    onCheck={(value: any) => {
                                      setRadioValue(value);
                                      if (value === "balance") {
                                        setBalanceValue(`${environment.currency}` + balance);
                                      }
                                    }}
                                  >
                                    <Radio value="balance">Balance</Radio>
                                    <Radio value="custom">Custom Amount</Radio>
                                  </Radio.Group>
                                </MethodContainer>

                                <Input
                                    label="Amount"
                                    labelType="left"
                                    value={balanceValue}
                                    disabled={radioValue === "balance"}
                                    onChange={(event: any) => {
                                      let value = event.target.value;
                                      value = value.replaceAll(`${environment.currency}`, "");
                                      // NOTE: if custom balance exceed max balance then setting max balance
                                      if(String(Number(value)) === "NaN") {
                                        setBalanceValue(`${environment.currency}1`);
                                        props.setRepayBalance(1);
                                      } else {
                                        if(Number(value) > Number(balance)) {
                                          value = balance;
                                        }
                                        setBalanceValue(`${environment.currency}` + value);
                                        props.setRepayBalance(value);
                                      }

                                    }}
                                />
                                <PaymentMethodContainer>
                                  <BoldText>Payment Method</BoldText>

                                  <Select
                                    dataSource={props.paymentMethodList}
                                    defaultIndex={paymentMethodValue}
                                    fixButtonWidth={"300px"}
                                    maxItemCount={4}
                                    // FIXME: to controlled component
                                    onSelect={(index:number) => {
                                      setPaymentMethodValue(index);
                                      props.setPayType(index);
                                    }}
                                  />
                                </PaymentMethodContainer>

                                <Horizontal />


                                <AdvertisementImg/>



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

                        </RepaymentModalContainer>
                    );
                }}
            ></Overlay>
        </div>
    );
};

export default RepaymentModal;
