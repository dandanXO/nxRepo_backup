import React, {useState} from "react";
import {Input} from "../../core/components/Input";
import styled from "styled-components";
import {NotificationButton} from "../../core/components/Modal/DefaultButtons";

const Page = styled.div`
    background: #f9fafc;
    .mb {
      margin-bottom: 10px;
    }
`
const Paragraph = styled.p`
    color: #101010;
`
const SubmitButton = styled(NotificationButton)`
    color: #fff;
`
const Index = () => {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");
    const [value5, setValue5] = useState("");
    return (
        <Page>
            <Input
                label="Cardholder Name"
                labelType="top"
                value={value}
                onChange={event => {
                    console.log("event", event.target.value);
                    setValue(event.target.value);
                }}
                errorMessage="Error message"
            />
            <Paragraph>
                For KYC, your Cardholder name and Aadhaar name should be match.
            </Paragraph>

            <Input
                className="mb"
                label="IFSC Code"
                value={value2}
                onChange={event => {
                    console.log("event", event.target.value);
                    setValue2(event.target.value);
                }}
                errorMessage="Error message"
            />
            <Input
                className="mb"
                label="Account Number"
                value={value3}
                onChange={event => {
                    console.log("event", event.target.value);
                    setValue3(event.target.value);
                }}
                errorMessage="Error message"
            />
            <Input
                className="mb"
                label="Confirm Account Number"
                value={value4}
                onChange={event => {
                    console.log("event", event.target.value);
                    setValue4(event.target.value);
                }}
                errorMessage="Error message"
            />
            <Input
                className="mb"
                label="UPI ID"
                value={value5}
                onChange={event => {
                    console.log("event", event.target.value);
                    setValue5(event.target.value);
                }}
                errorMessage="Error message"
            />
            <SubmitButton
                onClick={() => {

                }}
            >
                Submit
            </SubmitButton>

        </Page>
    )
}

export default Index;
