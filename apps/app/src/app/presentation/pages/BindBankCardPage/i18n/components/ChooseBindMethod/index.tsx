import React from "react";
import styled from "styled-components";
import BankAccountSVG from "./ic_bank_account_icon.svg";
import MobileWalletSVG from "./ic_mobile_wallet_icon.svg";
import BDMobileWalletSVG from "./bd_ic_mobile_wallet_icon.png";
import unselectedSVG from "./ic_check_disable_icon.svg";
import selectedSVG from "./ic_check_available_icon.svg";
import {Label} from "../../../components/Label";
import {useTranslation, WithTranslation, withTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";
import {environment} from "../../../../../../../environments/environment";
import {IAllCountryIdentityName} from "../../../../../../domain/country/constants/IAllCountryIdentityName";
import {renderByCountry} from "../../../../../../modules/i18n";
import {PakistanCountry} from "../../../../../../domain/country/constants/PakistanCountry";
import {BangladeshCountry} from "../../../../../../domain/country/constants/BangladeshCountry";
import {IndiaCountry} from "../../../../../../domain/country/constants/IndiaCountry";
import {IndiaBindBankAccountPage} from "../IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "../PakistanBindBankAccountPage";
import {BangladeshBindBankAccountPage} from "../BangladeshBindBankAccountPage";

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

type IChooseBindMethod = {
  value: 0 | 1;
  changeOptionValueCallback: (option: 0|1) => void;
  disable: boolean;
}

export const ChooseBindMethod = (props: IChooseBindMethod) => {
  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  const wallet = <Option onClick={() => props.changeOptionValueCallback(0)}>
    <OptionIcon enable={props.value === 0}/>
    <img style={{ width: 60, height: 60 }} src={environment.country === IAllCountryIdentityName.BN ? BDMobileWalletSVG : MobileWalletSVG}/>
    <Label>{t("Mobile wallet")}</Label>
  </Option>;

  const bankcard = <Option onClick={() => {
    if(!props.disable) props.changeOptionValueCallback(1)
  }} style={{
    background: props.disable ? "#D0D0D0": ""
  }}>
    <OptionIcon enable={props.value === 1}/>
    <img style={{ width: 60, height: 60 }}  src={BankAccountSVG}/>
    <Label>{t("Bank account")}</Label>
  </Option>

  return (
    <Container>
      <Label>{t("Choose the method to receive the money")}</Label>

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
