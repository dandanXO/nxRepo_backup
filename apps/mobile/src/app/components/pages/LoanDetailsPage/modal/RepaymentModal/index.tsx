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
import {environment} from "../../../../../../environments/environment";
import {WithTranslation, withTranslation} from "react-i18next";
import {i18nRepaymentModal} from "./i18n/translations";
import {AllCountryInstance} from "../../../../../../environments/config/AllCountry";

const Paragraph = styled.div`
    text-align: left;
    color: #aaaaaa;
    line-height: 16px;
`;
export const RepaymentModalContainer = styled.div`
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

export const SectionButton = styled.div`
    margin-bottom: 10px;
`;
const SectionButton2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const RepayAndApplyButton = styled(NotificationButton)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${(props) => props.theme.button.primary.text};
    background: ${(props) => props.disable ? "#C0C0C0" : props.theme.button.primary.main};
`;

const RepaymentCancelButton = styled(NotificationButton)`
    flex: 1 0 auto;
    margin-right: 12px;
    background: ${(props) => props.theme.button.secondary.main};
    color: ${(props) => props.theme.button.secondary.text};
`;

export const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
    background: ${(props) => props.theme.button.secondary.main};
    color: ${(props) => props.theme.button.secondary.text};
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



type RepaymentModalProps = {
    balance: number;
    setRepayBalance: React.Dispatch<React.SetStateAction<number>>;
    setShowRepaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRepaymentNoticeModal: React.Dispatch<React.SetStateAction<boolean>>;
    isRepayTypesFetching: boolean;
    paymentMethodList: string[];
    setPayType: React.Dispatch<React.SetStateAction<number>>;
    // FIXME:
    setShowRepaymentAdsModal: React.Dispatch<React.SetStateAction<boolean>>;

  balanceValue: string;
  setBalanceValue: React.Dispatch<React.SetStateAction<string>>;

  handlePostRepayCreate: any;
} & WithTranslation;

const RepaymentModal = (props: RepaymentModalProps) => {

    // NOTE: 標籤
    const balance = props.balance;

    // NOTE: 變動數值
    // const [balanceValue, setBalanceValue] = useState(String(`${environment.currency}` + balance));

    const [radioValue, setRadioValue] = useState("balance");
    const [paymentMethodValue, setPaymentMethodValue] = useState(0);

    const handleConfirm = () => {
      // self
      props.setShowRepaymentModal(false);

      // NOTE: 印度不顯示還款再借廣告，直接還款
      if(environment.country === AllCountryInstance.IndiaCountry.country) {
        if(String(Number(radioValue)) !== "NaN" && String(radioValue) !== "0") {
          props.handlePostRepayCreate(
            false,
            false,
            radioValue
          )
        }
      } else {
        // NOTE: 其他國家一樣會顯示還款再借廣告
        props.setShowRepaymentAdsModal(true);
      }

    };
    return (
        <div>
            <Overlay
                show={true}
                content={(hide: () => void) => {
                  // let price = Number(String(props.balanceValue).replace(`${environment.currency}`, ""));
                  // if(price - 1 <= 0) {
                  //   price = 0;
                  // }  else {
                  //   price = price - 1;
                  // }

                    return (
                        <RepaymentModalContainer>
                            <Title>{props.t("Repayment")}</Title>
                            <Horizontal />

                            <SectionBalance>
                                <ListItem
                                    title={props.t("Balance") as any}
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
                                        props.setBalanceValue(`${environment.currency}` + balance);
                                      }
                                    }}
                                  >
                                    <Radio value="balance">{props.t("Balance")}</Radio>
                                    <Radio value="custom">{props.t("Custom Amount")}</Radio>
                                  </Radio.Group>
                                </MethodContainer>

                                <Input
                                    label={props.t("Amount") as string}
                                    labelType="left"
                                    // value={radioValue === "balance" ? props.balanceValue : `${environment.currency}${price}`}
                                    value={props.balanceValue}
                                    disabled={radioValue === "balance"}
                                    // onBlur={(event: any) => {
                                    //   let value = event.target.value;
                                    //   value = value.replaceAll(`${environment.currency}`, "");
                                    //   if(String(value) === "") {
                                    //     setBalanceValue(`${environment.currency}1`);
                                    //     props.setRepayBalance(1);
                                    //   }
                                    // }}
                                    onChange={(event: any) => {
                                      let value = event.target.value;
                                      value = value.replaceAll(`${environment.currency}`, "");
                                      // NOTE: if custom balance exceed max balance then setting max balance
                                      if(String(Number(value)) === "NaN" || String(value) === "0") {
                                        props.setBalanceValue(`${environment.currency}1`);
                                        props.setRepayBalance(1);
                                      } else {
                                        if(Number(value) > Number(balance)) {
                                          // if(balance - 1 < 0) {
                                          //   value = 0;
                                          // }  else {
                                            value = balance;
                                          // }

                                        }
                                        console.log("[repay] onChange.value", value)
                                        console.log(value)
                                        props.setBalanceValue(`${environment.currency}` + value);
                                        props.setRepayBalance(value);
                                      }
                                    }}
                                />
                                <PaymentMethodContainer>
                                  <BoldText>{props.t("Payment Method")}</BoldText>

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
                                        disable={radioValue !== "balance"}
                                        onClick={() => {
                                            if(radioValue !== "balance") return;
                                            if(props.isRepayTypesFetching) return ;
                                            props.setShowRepaymentModal(false);
                                            props.setShowRepaymentNoticeModal(
                                                true
                                            );
                                        }}
                                    >
                                        <RepayICON />{props.t("Repay and Apply Again")}
                                    </RepayAndApplyButton>
                                </SectionButton>
                                <SectionButton2>
                                    <RepaymentCancelButton
                                        onClick={() =>{
                                          if(props.isRepayTypesFetching) return ;
                                          props.setShowRepaymentModal(false)
                                          // navigate("/loan-details", {
                                          //   state: {
                                          //     name: STATE_REPAYMENT_STEPS,
                                          //   }
                                          // })
                                        }}
                                    >
                                      {props.t("Cancel")}
                                    </RepaymentCancelButton>
                                    <RepaymentButton onClick={() => {
                                      if(props.isRepayTypesFetching) return ;
                                      handleConfirm();
                                    }}>
                                      {props.t("Repayment")}
                                    </RepaymentButton>
                                </SectionButton2>

                            </SectionOptions>


                            <SectionParagraph>
                              <Paragraph>{props.t("Attention")}:</Paragraph>
                              <Paragraph>
                                {props.t("1. Before repayment, please make sure that youhave enough balance on your bank account.")}
                              </Paragraph>
                              <Paragraph>
                                {props.t("2. In order to protect your rights, we strongly recommend you take a screenshot and upload your UTR number after completing the repayment and return to the APP to upload your repayment receipt.")}
                              </Paragraph>
                            </SectionParagraph>

                        </RepaymentModalContainer>
                    );
                }}
            ></Overlay>
        </div>
    );
};


export default withTranslation(i18nRepaymentModal.namespace)(RepaymentModal);
