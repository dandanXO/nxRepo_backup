import React from "react";
import styled from "styled-components";
import BankAccountSVG from "./ic_bank_account_icon.svg";
import MobileWalletSVG from "./ic_mobile_wallet_icon.svg";
import unselectedSVG from "./ic_check_disable_icon.svg";
import selectedSVG from "./ic_check_available_icon.svg";
import {Label} from "../../../components/Label";
import {useTranslation} from "react-i18next";
import {i18nBankBindPageKey} from "../../translations";

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

interface IChooseBindMethod {
  value: 0 | 1;
  changeOptionValueCallback: (option: 0|1) => void;
  disable: boolean;
}

export const ChooseBindMethod = (props: IChooseBindMethod) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Label>{t("Choose the method to receive the money", { ns: i18nBankBindPageKey.PakistanKey })}</Label>
      <OptionContainer>
        <Option onClick={() => props.changeOptionValueCallback(0)}>
          <OptionIcon enable={props.value === 0}/>
          <img src={MobileWalletSVG}/>
          <Label>{t("Mobile wallet", { ns: i18nBankBindPageKey.PakistanKey })}</Label>
        </Option>
        <Option onClick={() => {
          if(!props.disable) props.changeOptionValueCallback(1)
        }} style={{
          background: props.disable ? "#D0D0D0": ""
        }}>
          <OptionIcon enable={props.value === 1}/>
          <img src={BankAccountSVG}/>
          <Label>{t("Bank account", { ns: i18nBankBindPageKey.PakistanKey })}</Label>
        </Option>
      </OptionContainer>
    </Container>
  )
}