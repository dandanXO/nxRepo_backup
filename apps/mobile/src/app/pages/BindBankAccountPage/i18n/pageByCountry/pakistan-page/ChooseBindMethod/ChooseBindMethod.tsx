import React from "react";
import styled from "styled-components";
import BankAccountSVG from "./ic_bank_account_icon.svg";
import MobileWalletSVG from "./ic_mobile_wallet_icon.svg";
import unselectedSVG from "./ic_check_disable_icon.svg";
import selectedSVG from "./ic_check_available_icon.svg";
import {Label} from "../../../../components/Label";

const Container = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
`;

const StyledOptionIcon = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
`;

const OptionIcon = (props: { enable: boolean}) => {
  return (
    <StyledOptionIcon>
      {!props.enable ? <img src={unselectedSVG}/> : <img src={selectedSVG}/>}
    </StyledOptionIcon>
  )
}

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`

const Option = styled.div`
  box-sizing: border-box;
  border-radius: 9px;
  border: solid 1px #aaa;
  background-color: #fffdfd;

  padding: 9px 26px;
  text-align: center;

  position: relative;
`

export interface IChooseBindMethod {
  value: 0 | 1;
  changeOptionValueCallback: () => void;
}
export const ChooseBindMethod = (props: IChooseBindMethod) => {

  return (
    <Container>
      <Label>Choose the method to receive the money</Label>
      <OptionContainer>
        <Option onClick={props.changeOptionValueCallback}>
          <OptionIcon enable={props.value === 0}/>
          <img src={MobileWalletSVG}/>
          <Label>Mobile wallet</Label>
        </Option>
        <Option onClick={props.changeOptionValueCallback}>
          <OptionIcon enable={props.value === 1}/>
          <img src={BankAccountSVG}/>
          <Label>Bank account</Label>
        </Option>
      </OptionContainer>
    </Container>
  )
}
