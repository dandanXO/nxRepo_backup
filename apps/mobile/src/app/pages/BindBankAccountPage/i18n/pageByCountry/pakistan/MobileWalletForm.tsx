import {Form} from "../../../components/Form";
import {Button, Input, InputValue, Select} from "@frontend/mobile/shared/ui";
import React, {useState} from "react";
import {Label} from "../../Label";
import {IForm} from "../../../types/IGeneralPageLayoutTypeProps";
import styled from "styled-components";

const Container = styled.div`
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
`;

type IGeneralMobileWalletFormProps = IForm & {
  //
}
export const MobileWalletForm = (props: IGeneralMobileWalletFormProps) => {
  const [walletValue, setWalletValue] = useState(0);

  const [mobileData, setMobileData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  const onMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, "");
    setMobileData({
      ...mobileData,
      data,
    });
  }

  return (
    <Container>
      <Form>
        <Label>Please select the of your mobile wallet</Label>
          <Select
            className="mb"
            dataSource={["Easypaisa1", "Easypaisa2", "Easypaisa3", "Easypaisa4"]}
            defaultIndex={walletValue}
            fixButtonWidth={"calc(100vw - 36px)"}
            // FIXME: to controlled component
            onSelect={(index:number) => {
              setWalletValue(index);
            }}
          />

          <Label>Your mobile wallet account</Label>
          <Input
            className="mb"
            labelType={"left"}
            label={"+92"}
            placeholder="11111111111"
            value={mobileData.data}
            onChange={onMobileDataChange}
            errorMessage={mobileData.errorMessage}
          />

        <Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>
      </Form>
    </Container>
  );
}
