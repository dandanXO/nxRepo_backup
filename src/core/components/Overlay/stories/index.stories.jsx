
import React, {useState} from "react";
import {
    Overlay,
} from "./index";

import { storiesOf } from "@storybook/react";
import {AppThemeProvider} from "../../index";
import styled from "styled-components";
import ListItem from "../../ListItem";
import Horizontal from "../../Modal/Horizontal";
import Title from "../../Modal/Title";
import Radio from "../../Radio";
import {Input} from "../../Input";
import {CancelButton, NotificationButton} from "../../Modal/DefaultButtons";

const RepaymentModal = styled.div`
      color: #101010;
`;
const SectionBalance = styled.div`
      padding: 10px;
`
const SectionOptions = styled.div`
    padding: 10px;
`;
const SectionParagraph = styled.div`
      margin-bottom: 10px;
`

const ErrorMessage = styled.div`
      color: #ff0000;
      text-align: left;
`

const SectionButton = styled.div`
      margin-bottom: 10px;
`
const SectionButton2 = styled.div`
    display: flex;
    flex-direction: row;
  justify-content: space-between;
`

const RepayAndApplyButton = styled(NotificationButton)`
    color: #FFF;
`;

const RepaymentCancelButton = styled(NotificationButton)`
    background: #fff0de;
    color:#f58b10;
    flex: 1 0 auto;
    //flex-basis: 30%;
    margin-right: 12px;   
`

const RepaymentButton = styled(RepayAndApplyButton)`
    flex: 3 0 auto;
  //flex-basis: 60%;
  background: #fcc76e;
`
storiesOf("Page/Repayment", module)
    .add("Repayment", () => {
        const Paragraph = styled.div`
          text-align: left;
          color: #aaaaaa;
          line-height: 16px;
        `;
        const [value, setValue] = useState("balance");
        return (
            <AppThemeProvider>
                <div>
                    <div>Property: confirmText, cancelText</div>
                    <div>Value: string</div>
                    <Overlay
                        show={true}
                        title="Notice"
                        content={(hide) => {
                            return (
                                <RepaymentModal>
                                    <Title>Repayment</Title>
                                    <Horizontal/>

                                    <SectionBalance>
                                        <ListItem title="Balance" text="8500"/>
                                    </SectionBalance>

                                    <Horizontal/>

                                    <SectionOptions>
                                        <Radio.Group
                                            value={value}
                                            onCheck={value => {
                                                console.log("Radio.Group.onCheck.value", value);
                                                setValue(value);
                                            }}
                                        >
                                            <Radio value="balance">Balance</Radio>
                                            <Radio value="custom">Custom Amount</Radio>
                                        </Radio.Group>

                                        <Input
                                            placeholder="text"
                                            value={value}
                                            onChange={event => {
                                                console.log("event", event.target.value);
                                                setValue(event.target.value);
                                            }}
                                            onFocus={() => {
                                                console.log("onFocus");
                                            }}
                                            onBlur={() => {
                                                console.log("onBlur");
                                            }}
                                            onKeyDown={event => {
                                                console.log("onKeyDown", event.target.value);
                                            }}
                                            onKeyUp={event => {
                                                console.log("onKeyUp", event.target.value);
                                            }}
                                        />
                                        <ErrorMessage>error message</ErrorMessage>
                                        <SectionParagraph>
                                            <Paragraph>Attention:</Paragraph>
                                            <Paragraph>
                                                1. Before repayment, please make sure that youhave
                                                enough  balance on your bank account.
                                            </Paragraph>
                                            <Paragraph>
                                                2. In order to protect your rights, we strongly
                                                recommend you take a screenshot and upload
                                                your UTR number after completing the repayment
                                                and return to the APP to upload your repayment
                                                receipt.
                                            </Paragraph>
                                        </SectionParagraph>
                                        <SectionButton>
                                            <RepayAndApplyButton>Repay and Apply Again</RepayAndApplyButton>
                                        </SectionButton>
                                        <SectionButton2>
                                            <RepaymentCancelButton>Cancel</RepaymentCancelButton>
                                            <RepaymentButton>Repayment</RepaymentButton>
                                        </SectionButton2>
                                    </SectionOptions>


                                </RepaymentModal>
                            )
                        }}
                        enableTitleHorizontal={true}
                    ></Overlay>
                </div>
            </AppThemeProvider>
        )
    })
