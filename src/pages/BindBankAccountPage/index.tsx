import React, {useCallback, useState} from "react";
import {Input} from "../../core/components/Input";
import styled from "styled-components";
import Page from "../../core/components/Page";
import Button from "../../core/components/Button";
import type {InputValue} from "../../core/types/InputValue";

const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
`
const Form = styled.div`
  .mb {
    margin-bottom: 10px;
  }
  margin-bottom: 30px;
`
const Paragraph = styled.p`
    color: #101010;
`

const BindBankAccountPage = () => {
    const [value, setValue] = useState<InputValue<string>>({
        data: "",
        isValidation: true,
        errorMessage: "",
    });
    const [value2, setValue2] = useState<InputValue<string>>({
        data: "",
        isValidation: true,
        errorMessage: "",
    });
    const [value3, setValue3] = useState<InputValue<string>>({
        data: "",
        isValidation: true,
        errorMessage: "",
    });
    const [value4, setValue4] = useState<InputValue<string>>({
        data: "",
        isValidation: true,
        errorMessage: "",
    });
    const [value5, setValue5] = useState<InputValue<string>>({
        data: "",
        isValidation: true,
        errorMessage: "",
    });

    // NOTICE: reuse me
    const confirm = useCallback(() => {
        if(!(value.isValidation && value2.isValidation && value3.isValidation && value4.isValidation && value5.isValidation)) return;
        alert("confirm")
    }, []);

    // NOTICE: reuse me
    const onInputBlur = useCallback((data: boolean | string | number, setValue: React.Dispatch<InputValue<any>>) => {
        if(typeof data === "boolean" && data) {
            setValue({ data, isValidation: true, errorMessage: ""});
        } else if(typeof data === "string" && data.length > 0) {
            setValue({ data, isValidation: true, errorMessage: ""});
        } else if(typeof data === "number" && String(data).length > 0) {
            setValue({ data, isValidation: true, errorMessage: ""});
        } else {
            setValue({ data, isValidation: true, errorMessage: "This field cannot be left blank"});
        }
    }, [value]);

    return (
        <CustomPage>
            <Form>
                <Input
                    label="Cardholder Name"
                    value={value.data}
                    onChange={event => {
                        setValue({
                            data: event.target.value,
                        });
                    }}
                    onBlur={(event) => {
                        onInputBlur(value.data, setValue);
                    }}
                    errorMessage={value.errorMessage}
                />

                <Paragraph>
                    For KYC, your Cardholder name and Aadhaar name should be match.
                </Paragraph>

                <Input
                    className="mb"
                    label="IFSC Code"
                    value={value2.data}
                    onChange={event => {
                        setValue2({
                            data: event.target.value
                        });
                    }}
                    onBlur={(event) => {
                        onInputBlur(value2.data, setValue2);
                    }}
                    errorMessage={value2.errorMessage}
                />
                <Input
                    className="mb"
                    label="Account Number"
                    value={value3.data}
                    onChange={event => {
                        setValue3({
                            data: event.target.value
                        });
                    }}
                    onBlur={(event) => {
                        onInputBlur(value3.data, setValue3);
                    }}
                    errorMessage={value3.errorMessage}
                />
                <Input
                    className="mb"
                    label="Confirm Account Number"
                    value={value4.data}
                    onChange={event => {
                        setValue4({
                            data: event.target.value
                        });
                    }}
                    onBlur={(event) => {
                        onInputBlur(value4.data, setValue4);
                    }}
                    errorMessage={value4.errorMessage}
                />
                <Input
                    className="mb"
                    label="UPI ID"
                    value={value5.data}
                    onChange={event => {
                        setValue5({
                            data: event.target.value
                        });
                    }}
                    onBlur={(event) => {
                        onInputBlur(value5.data, setValue5);
                    }}
                    errorMessage={value5.errorMessage}
                />
            </Form>

            <Button onClick={() => confirm()}>
                Submit
            </Button>

        </CustomPage>
    )
}

export default BindBankAccountPage;
