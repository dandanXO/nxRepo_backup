import React from "react";
import styled from "styled-components";
import BankAccountSVG from "./ic_bank_account_icon.svg";
import MobileWalletSVG from "./ic_mobile_wallet_icon.svg";
import BDMobileWalletSVG from "./bd_ic_mobile_wallet_icon.png";
import {Label} from "../Label";
import {useTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";
import {environment} from "../../../../../../environments/environment";
import {AllCountryIdentityName} from "../../../../../../../../../libs/shared/domain/src/country/AllCountryIdentityName";
import {renderByCountry} from "../../../../../modules/i18n";
import {PakistanCountry} from "../../../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import {BangladeshCountry} from "../../../../../../../../../libs/shared/domain/src/country/BangladeshCountry";
import {IThemeConfig} from "@frontend/mobile/shared/ui";
import {AiOutlineCheckCircle} from "@react-icons/all-files/ai/AiOutlineCheckCircle";

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
      {!props.enable ? <AiOutlineCheckCircle size={25} color={"gray"}/> : <AiOutlineCheckCircle size={25} color={"#18A851"}/>}
    </StyledOptionIcon>
  )
}

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`

const Option = styled.div`
  flex: 1;
  box-sizing: border-box;
  border-radius: 4px;
  border: ${(props: {theme: IThemeConfig; enable: boolean}) => {
    return props.theme && props.enable ? `solid 1.5px ${props.theme.button.primary.main}` : "solid 1.5px #aaa"
  }};
  background-color: ${(props: {theme: IThemeConfig; enable: boolean}) => {
    return props.theme && props.enable ? "#fffdfd" : "#F0F1F3";
  }};

  padding: 9px 26px;
  text-align: center;
  position: relative;
`

type IChooseBindMethod = {
  value: 0 | 1;
  changeOptionValueCallback: (option: 0|1) => void;
  disable: boolean;
}

export const ChooseBindMethod = (props: IChooseBindMethod) => {
  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  const wallet = (
    <Option onClick={() => props.changeOptionValueCallback(0)} enable={props.value === 0}>
      <OptionIcon enable={props.value === 0}/>
      <img style={{ width: 60, height: 60, margin: "auto" }} src={environment.country === AllCountryIdentityName.BN ? BDMobileWalletSVG : MobileWalletSVG}/>
      <Label>{t("Mobile wallet")}</Label>
    </Option>
  );

  const bankcard = (
    <Option
      className={"mr-2"}
      enable={props.value === 1}
      onClick={() => {
        if(!props.disable) props.changeOptionValueCallback(1)
      }} style={{
        background: props.disable ? "#D0D0D0": ""
      }}
    >
      <OptionIcon enable={props.value === 1}/>
      <img style={{ width: 60, height: 60, margin: "auto" }}  src={BankAccountSVG}/>
      <Label>{t("Bank Card")}</Label>
    </Option>
  )

  return (
    <Container>
      <Label>{"Choose the payment method"}</Label>

      <OptionContainer>

        {renderByCountry({
          // NOTICE: default 0 index
          [PakistanCountry.country]: (
            <>
              {bankcard}
              {wallet}
            </>
          ),
          [BangladeshCountry.country]: (
            <>
              {wallet}
              {bankcard}
            </>
          ),
        }, (
          <>
            {bankcard}
            {wallet}
          </>
        ))}

      </OptionContainer>

    </Container>
  )
}
