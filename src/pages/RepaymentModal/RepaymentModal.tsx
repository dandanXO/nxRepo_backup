
import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "../../core/components/ListItem";
import Horizontal from "../../core/components/Modal/Horizontal";
import Title from "../../core/components/Modal/Title";

import {Input} from "../../core/components/Input";
import {CancelButton, NotificationButton} from "../../core/components/Modal/DefaultButtons";

import Overlay from "../../core/components/Overlay";
import Radio from "../../core/components/Radio";
import {RepayICON} from "../../core/components/Icon/Icon";

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
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const RepaymentModal = () => {
    const [radioValue, setRadioValue] = useState("balance");
    const [value, setValue] = useState();
    return (
        <div>
            <Overlay
                show={true}
                title="Notice"
                content={(hide: () => void) => {
                    return (
                        <RepaymentModalContainer>
                            <Title>Repayment</Title>
                            <Horizontal/>

                            <SectionBalance>
                                <ListItem title="Balance" text="₹ 8,500"/>
                            </SectionBalance>

                            <Horizontal/>

                            <SectionOptions>
                                <Radio.Group
                                    value={radioValue}
                                    onCheck={(value: any) => {
                                        console.log("Radio.Group.onCheck.value", value);
                                        setRadioValue(value);
                                    }}
                                >
                                    <Radio value="balance">Balance</Radio>
                                    <Radio value="custom">Custom Amount</Radio>
                                </Radio.Group>

                                <Input
                                    label="Amount"
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
                                    <RepayAndApplyButton>
                                        <RepayICON/> Repay and Apply Again
                                    </RepayAndApplyButton>
                                </SectionButton>
                                <SectionButton2>
                                    <RepaymentCancelButton>Cancel</RepaymentCancelButton>
                                    <RepaymentButton>Repayment</RepaymentButton>
                                </SectionButton2>
                            </SectionOptions>


                        </RepaymentModalContainer>
                    )
                }}
                enableTitleHorizontal={true}
            ></Overlay>
        </div>
    )
}

export default RepaymentModal;
